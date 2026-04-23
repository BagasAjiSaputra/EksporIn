"use client"

import { useState } from "react";
import { LoginService } from "./auth.service";
import { LoginRequest } from "./auth.types";

export function useLogin() {

    const [loading, setLoading] = useState(false)
    
    async function login(data : LoginRequest) {
        setLoading(true)
        try {
            const res = await LoginService({
                email : data.email,
                password : data.password
            })
            return res
        } finally {
            setLoading(false)
        }
    }

    return { login, loading}

}