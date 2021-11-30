declare module 'process' {
    global {
        const process: NodeJS.Process;
        namespace NodeJS {
            interface Process {
                env: {
                    NODE_ENV: string;
                    ACCESS_TOKEN_SECRET: string;
                    ORIGIN: string;
                };
            }
        }
    }
}
