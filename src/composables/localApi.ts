export interface ApiParameters {
    method?: string
    headers?: Headers 
    body?: string
}

async function callApi<T>(endpoint: string, params: ApiParameters): Promise<T> {
    params.headers ? params.headers.set("Content-Type", "application/json") : params.headers = new Headers({"Content-Type": "application/json"})
    const res = await fetch(`${"https://auth.zoe.rip" /* import.meta.env.VITE_BASE_URL || "http://localhost:8099" */}${endpoint}`, params)

    if (!res.ok) throw res
    setTimeout(() => {}, 100) // frontend slowdown
    const js = await res.json() as T
    return js
}

export const register = async (username: string, email: string, password: string, role: string = "user") => {
    const registrationObj = {
        username: username,
        email: email,
        password: password,
        role: role
    }

    return await callApi<{ message: string }>("/api/register", {
        method: "post",
        body: JSON.stringify(registrationObj)
    })
}

export const login = async (username: string, password: string) => {
    const credsObj = {
        username: username,
        password: password
    }

    return await callApi<{ token: string, expires: string}>("/api/token", {
        method: "post",
        body: JSON.stringify(credsObj)
    })
}