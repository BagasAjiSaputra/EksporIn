"use client"

import { useState } from "react";
import { LoginService, RegisterService, ResetService } from "./auth.service";
import { LoginRequest, RegisterRequest, ResetRequest } from "./auth.types";

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

export function useRegister() {
    const [loading, setLoading] = useState(false)

    async function register(data : RegisterRequest) {
        setLoading(true)
        try {
            const res = await RegisterService({
                name : data.name,
                email : data.email,
                password : data.password
            })
            return res
        } finally {
            setLoading(false)
        }
    }

    return {register, loading}
}

export function useReset() {
    const [loading, setLoading] = useState(false)

    async function reset(data : ResetRequest) {
        setLoading(true)
        try {
            const res = await ResetService({
                email : data.email
            })
            return res
        } finally {
            setLoading(false)
        }
    }

    return {reset, loading}

}