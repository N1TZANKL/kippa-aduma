/// <reference types="next" />
/// <reference types="next/types/global" />

declare namespace NodeJS {
    interface ProcessEnv {
        readonly DATABASE_URL: string;
        readonly DB_NAME: string;
        readonly SECRET: string;
        readonly SITE_COOKIE: string;
    }
}