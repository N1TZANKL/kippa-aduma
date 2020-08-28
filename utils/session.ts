import { withIronSession as wis, SessionOptions } from "next-iron-session";
import { NextApiHandler, GetServerSideProps, GetServerSidePropsResult, GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";

export const SESSION_OPTIONS: SessionOptions = {
    cookieName: process.env.SITE_COOKIE,
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
    password: process.env.SECRET,
};

export function withIronSession(handler: NextApiHandler) {
    return wis(handler, SESSION_OPTIONS);
}

export type WithUser<T> = T & { user: string };

export function withUserSession<T = any>(handler?: GetServerSideProps<T>): GetServerSideProps<WithUser<T>> {
    return wis(
        (async (ctx) => {
            try {
                const user = getCurrentUserAndRedirectIfNone(ctx);
                const result: GetServerSidePropsResult<T> = (await handler?.(ctx)) || ({ props: {} } as any);

                (result.props as any).user = user;
                return result;
            } catch (e) {
                return { props: {} };
            }
        }) as GetServerSideProps,
        SESSION_OPTIONS
    );
}

function getCurrentUserAndRedirectIfNone(context: GetServerSidePropsContext<ParsedUrlQuery>) {
    const user = context.req.session.get("user");

    if (!user) {
        context.res.writeHead(302, { Location: "/login" }).end();
        throw new Error("User not logged in!");
    }
    return user;
}
