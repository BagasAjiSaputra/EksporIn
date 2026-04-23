import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, ResetPasswordRequest, ResetPasswordResponse, ResetRequest, ResetResponse } from "./auth.types";

export async function LoginApi(data : LoginRequest): Promise<LoginResponse> {
    
    const res = await fetch("/api/login", {
        method : "POST",
        body : JSON.stringify(data)
    })

    const response = await res.json()

    if (!res.ok) {
        throw response
    }

    return response
}

export async function RegisterApi(data : RegisterRequest): Promise<RegisterResponse> {

    const res = await fetch ("/api/register", {
        method : "POST",
        body : JSON.stringify(data)
    })

    const response = await res.json()

    if (!res.ok) {

        throw response
    }

    return response
}

export async function ResetApi(data : ResetRequest): Promise<ResetResponse> {

    const res = await fetch("/api/reset", {
        method : "POST",
        body : JSON.stringify(data)
    })

    const response = await res.json()

    if (!res.ok) {
        throw response
    }

    return response
}

export async function ResetPasswordApi(data : ResetPasswordRequest): Promise<ResetPasswordResponse> {

    const res = await fetch("/api/reset_password", {
        method : "POST",
        body : JSON.stringify(data)
    })

    const response = await res.json()

    if (!res.ok) {
        throw response
    }

    return response

}