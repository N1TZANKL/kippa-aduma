import { IncomingMessage } from "http";

import { withIronSession as wis, SessionOptions } from "next-iron-session";
import { NextApiHandler, GetServerSideProps, NextApiRequest, NextApiResponse } from "next";

import userModel from "../server/db/user/model";
import log, { LogTypes } from "./logger";
import withDBConnection from "./middlewares/mongodb";

export type UserSessionObject = {
    id: string;
    username: string;
    nickname: string;
    color: string;
};

export const SESSION_OPTIONS: SessionOptions = {
    cookieName: process.env.SITE_COOKIE as string,
    cookieOptions: {
        secure: false,
        // secure: process.env.NODE_ENV === "production",
    },
    password: process.env.SECRET as string,
};

export function withIronSession(handler: NextApiHandler): (...args: any[]) => Promise<void> {
    return wis(handler, SESSION_OPTIONS);
}

type NextHandlerWithUser = (req: NextApiRequest, res: NextApiResponse, user: UserSessionObject) => void | Promise<void>;

export function withAuthenticatedUser(handler: NextHandlerWithUser): (...args: any[]) => Promise<void> {
    return wis(async (req, res: NextApiResponse) => {
        const user = await assertUser(req);
        if (!user) return res.status(400).send("User is not authenticated");

        return handler(req, res, user);
    }, SESSION_OPTIONS);
}

export function withUserSession(
    handler?: () => Promise<{ props: Record<string, unknown> }>
): GetServerSideProps<{ props: Record<string, unknown> & { user: UserSessionObject } }> {
    return wis(async (ctx) => {
        const user = await assertUser(ctx.req);
        if (!user) {
            ctx.res.writeHead(302, { Location: "/login" }).end();
            return { props: {} };
        }

        if (!handler) return { props: { user } };

        const result = await handler();
        result.props.user = user;
        return result;
    }, SESSION_OPTIONS);
}

async function assertUserFunc(req: IncomingMessage /* res: ServerResponse */): Promise<UserSessionObject | null> {
    try {
        const id = req.session.get("user_id");

        if (!id) throw new Error("User not logged in");
        const dbUser = await userModel.findById(id).orFail(new Error("User does not exist"));

        return {
            id,
            username: dbUser.username,
            nickname: dbUser.nickname,
            color: dbUser.color,
        };
    } catch (e) {
        log("Caught error while attempting to assert user session:", LogTypes.ERROR, e);
        return null;
    }
}

const assertUser = withDBConnection(assertUserFunc);
