declare module 'process' {
    global {
        const process: NodeJS.Process;
        namespace NodeJS {
            interface Process {
                env: {
                    API_URL: string;
                    ORIGIN: string;
                };
            }
        }
    }
}
