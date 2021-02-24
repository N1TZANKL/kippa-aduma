/// <reference types="next" />
/// <reference types="next/types/global" />

declare namespace NodeJS {
    interface ProcessEnv {
        readonly HOST: string;
        readonly SECRET: string;
        readonly SITE_COOKIE: string;
        readonly CHAT_PORT: number;
        readonly STORAGE_PORT: number;
        readonly DB_NAME: string;
        readonly MONGO_HOST: string;
        readonly MONGO_USERNAME: string;
        readonly MONGO_PASSWORD: string;
        readonly MONGO_CONNECTION_STRING: string; // created by us for mongodb middleware, no need to supply
        readonly SERVICES_HOST: string; // created by us in docker-compose, no need to supply
    }
}
