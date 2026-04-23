import { LoginRequest, LoginResponse, ResetRequest, ResetResponse } from "./auth.types";

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

export async function ResetApi(data : ResetRequest): Promise<ResetResponse> {

    const res = await fetch("/api/reset", {
        method : "POST",
        body : JSON.stringify(data)
    })

    if (!res.ok) {
        throw new Error("Gagal Mengirim Link")
    }

    return res.json()
}