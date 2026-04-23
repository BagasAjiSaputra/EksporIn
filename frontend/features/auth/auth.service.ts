import { LoginApi, ResetApi } from "./auth.api";
import { LoginRequest, ResetRequest } from "./auth.types";


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

export async function ResetService(data : ResetRequest) {

    if (!data.email) {
        throw new Error("Email harus diisi")
    }

    const result = await ResetApi({
        email : data.email
    })

    return result
}