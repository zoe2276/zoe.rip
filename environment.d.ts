declare global {
    namespace NodeJS {
        interface ProcessEnv {
            VITE_ROOT : "127.0.0.1:8099" | "https://auth.zoe.rip"
        }
    }
}

export {}