declare module 'process' {
    global {
        const process: NodeJS.Process;
        namespace NodeJS {
            interface Process {
                env: {
                    NODE_ENV: string;
                    ACCESS_TOKEN_SECRET: string;
                    ACCESS_TOKEN_EXPIRES: string;
                    REFRESH_TOKEN_SECRET: string;
                    REFRESH_TOKEN_EXPIRES: string;
                    EMAIL_TOKEN_SECRET: string;
                    EMAIL_TOKEN_EXPIRES: string;
                    ORIGIN: string;
                    DB_HOST: string;
                };
            }
        }
    }
}
