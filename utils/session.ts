import { withIronSession as wis, SessionOptions } from "next-iron-session";
import { NextApiHandler, GetServerSideProps, GetServerSidePropsResult } from "next";

export const SESSION_OPTIONS: SessionOptions = {
    cookieName: process.env.SITE_COOKIE,
    cookieOptions: {
        secure: process.env.NODE_ENV === "production"
    },
    password: process.env.SECRET
};

export function withIronSession(handler: NextApiHandler) {
    return wis(handler, SESSION_OPTIONS);
}

export type WithUser<T> = T & { user: string; };

export function withUserSession<T = any>(handler?: GetServerSideProps<T>): GetServerSideProps<WithUser<T>> {
    return wis((async ctx => {
        const user = ctx.req.session.get("user");

        if (!user) {
            ctx.res.writeHead(302, { Location: "/login" }).end();
            return { props: {} };
        }

        const result: GetServerSidePropsResult<T> = (await handler?.(ctx)) || { props: {} } as any;

        (result.props as any).user = user;
        return result;        
    }) as GetServerSideProps, SESSION_OPTIONS);
}