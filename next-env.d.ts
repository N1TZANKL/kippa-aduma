/// <reference types="next" />
/// <reference types="next/types/global" />

declare namespace NodeJS {
    interface ProcessEnv {
        readonly DATABASE_URL: string;
        readonly SECRET: string;
        readonly SITE_COOKIE: string;
        readonly CHAT_PORT: number;
    }
}
