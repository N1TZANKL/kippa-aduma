import { IncomingMessage } from "http";

import { withIronSession as wis, SessionOptions } from "next-iron-session";
import { NextApiHandler, GetServerSideProps, GetServerSidePropsResult, NextApiRequest, NextApiResponse, GetServerSidePropsContext } from "next";

import userModel from "db/user/model";

export type UserSessionObject = {
    id: string;
    username: string;
    nickname: string;
    color: string;
};

export const SESSION_OPTIONS: SessionOptions = {
    cookieName: process.env.SITE_COOKIE,
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
    password: process.env.SECRET,
};

export function withIronSession(handler: NextApiHandler): (...args: any[]) => Promise<void> {
    return wis(handler, SESSION_OPTIONS);
}

type NextHandlerWithUser = (req: NextApiRequest, res: NextApiResponse, user: UserSessionObject) => void | Promise<void>;

export function withAuthenticatedUser(handler: NextHandlerWithUser): (...args: any[]) => Promise<void> {
    return wis(async (req, res: NextApiResponse) => {
        const user = await assertUser(req, res);
        if (!user) return res.status(400).send("User is not authenticated");

        return handler(req, res, user);
    }, SESSION_OPTIONS);
}

export type WithUser<T> = T & { user: UserSessionObject };

type ServerSidePropsWithUser<T> = (context: GetServerSidePropsContext, user: UserSessionObject) => Promise<GetServerSidePropsResult<T>>;

export function withUserSession<T = any>(handler?: ServerSidePropsWithUser<T>): GetServerSideProps<WithUser<T>> {
    return wis(
        (async (ctx) => {
            const user = await assertUser(ctx.req /* , ctx.res */);
            if (!user) {
                ctx.res.writeHead(302, { Location: "/login" }).end();
                return { props: {} };
            }

            if (!handler) return { props: { user } };

            const result: GetServerSidePropsResult<WithUser<T>> = (await handler(ctx, user)) as any;
            result.props.user = user;
            return result;
        }) as GetServerSideProps,
        SESSION_OPTIONS
    );
}

async function assertUser(req: IncomingMessage /* res: ServerResponse */): Promise<UserSessionObject | null> {
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
        return null;
    }
}
