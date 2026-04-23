import { LoginApi } from "./auth.api";
import { LoginRequest } from "./auth.types";


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