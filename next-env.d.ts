/// <reference types="next" />
/// <reference types="next/types/global" />

declare namespace NodeJS {
    interface ProcessEnv {
        // Do not supply the variables below - these are handled by the code / docker-compose file
        readonly MONGO_CONNECTION_STRING: string;
        readonly SERVICES_HOST: string;

        // Supply the variables below in a .env / .env.local file:
        readonly HOST: string;
        readonly SECRET: string;
        readonly SITE_COOKIE: string;
        readonly CHAT_PORT: number;
        readonly STORAGE_PORT: number;
        readonly DB_NAME: string;
        readonly MONGO_HOST: string;
        readonly MONGO_USERNAME: string;
        readonly MONGO_PASSWORD: string;
    }
}

/**
 * 
 * Example .env file contents (DO NOT COPY, ONLY USE AS REFERENCE):

        HOST=kippa
        SECRET=REALLY_BIG_SECRET_FOR_PROD_ENVIRONMENT
        SITE_COOKIE=kippa_aduma_token
        CHAT_PORT=1336
        STORAGE_PORT=1338
        DB_NAME=kippa
        MONGO_HOST=db
        MONGO_USERNAME=admin
        MONGO_PASSWORD=Aa123456

 */
