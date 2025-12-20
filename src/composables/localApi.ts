export interface ApiParameters {
    method?: string
    headers?: Headers 
    body?: string
}

async function callApi<T>(endpoint: string, params: ApiParameters): Promise<T> {
    params.headers ? params.headers.set("Content-Type", "application/json") : params.headers = new Headers({"Content-Type": "application/json"})
    const res = await fetch(`${import.meta.env.VITE_BASE_URL || "http://localhost:8099"}${endpoint}`, params)

    if (!res.ok) throw res
    const js =  setTimeout(async () => await res.json(), 100) as T
    return js // adds some frontend latency to slow down call frequency
}

export const register = async (username: string, password: string, email: string, role: string = "user") => {
    const registrationObj = {
        username: username,
        password: password,
        email: email,
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

    return await callApi<{ token: string, expiration: string}>("/api/token", {
        method: "post",
        body: JSON.stringify(credsObj)
    })
}