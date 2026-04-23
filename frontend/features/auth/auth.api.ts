import { LoginRequest, LoginResponse } from "./auth.types";

export async function LoginApi(data : LoginRequest): Promise<LoginResponse> {
    
    const res = await fetch("/api/login", {
        method : "POST",
        body : JSON.stringify(data)
    })

    if (!res.ok) {
        throw new Error("Login Gagal")
    }

    return res.json()
}