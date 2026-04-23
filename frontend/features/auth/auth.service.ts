import { LoginApi, RegisterApi, ResetApi, ResetPasswordApi } from "./auth.api";
import { LoginRequest, RegisterRequest, ResetPasswordRequest, ResetRequest } from "./auth.types";


export async function LoginService(data : LoginRequest) {
    if (!data.email || !data.password) {
        throw new Error("Email & Password Wajib")
    }

    const result = await LoginApi({
        email : data.email,
        password : data.password
    })

    return result
}

export async function RegisterService(data: RegisterRequest) {
    if (!data.name || !data.email || !data.password) {
        throw new Error("Semua Field wajib diisi")
    }

    const result = await RegisterApi({
        name : data.name,
        email : data.email,
        password : data.password
    })

    return result
}

export async function ResetService(data : ResetRequest) {

    if (!data.email) {
        throw new Error("Email harus diisi")
    }

    const result = await ResetApi({
        email : data.email
    })

    return result
}

export async function ResetPasswordService(data :ResetPasswordRequest) {
    if (!data.token || !data.new_password) {
        throw new Error("Password harus diisi")
    }

    const result = await ResetPasswordApi({
        token : data.token,
        new_password : data.new_password
    })

    return result
}