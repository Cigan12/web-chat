interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_API_WS_URL: string;
    readonly VITE_APP_URL: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
