import { LoginApi, RegisterApi, ResetApi } from "./auth.api";
import { LoginRequest, RegisterRequest, ResetRequest } from "./auth.types";


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