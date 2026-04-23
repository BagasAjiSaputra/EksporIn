"use server"

import { NextResponse } from "next/server";

export async function POST(req : Request) {

    const body = await req.json()

    const res = await fetch(`${process.env.BASE_URL}/reset-password`, {
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

    const response = NextResponse.json({success : true})

    return response
}