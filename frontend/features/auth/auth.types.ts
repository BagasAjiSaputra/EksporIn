export type LoginRequest = {
    email : string
    password : string
}

export type LoginResponse = {
    message : string
}

export type ResetRequest = {
    email : string
}

export type ResetResponse = {
    message : string
}