/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_TOKEN: string
    readonly VITE_GRAPHQL_API_URL: string
    readonly VITE_REST_API_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}