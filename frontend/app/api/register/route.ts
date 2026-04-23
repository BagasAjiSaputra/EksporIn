"use server"

import { NextResponse } from "next/server";

export async function POST(req : Request) {

    try {
        const body = await req.json()

    const res = await fetch(`${process.env.BASE_URL}/register`, {
        method : "POST",
        headers : {
            "Content-Type" : "Application/json",
        },
        body : JSON.stringify(body)
    })

    const data = await res.json()

    if (!res.ok) {
        return NextResponse.json(data, {status : res.status})
    }

    return NextResponse.json(data)
    
    } catch {
        return NextResponse.json({message : "Internal Server Error"}, {status : 500})
    }
}