export type LoginRequest = {
    email : string
    password : string
}

export type LoginResponse = {
    message : string
}

export type RegisterRequest = {
    name : string
    email : string
    password : string
}

export type RegisterResponse = {
    id : string
    name : string
    email : string
    role : string
    is_verified : string
    created_at : TimeRanges
}

export type ResetRequest = {
    email : string
}

export type ResetResponse = {
    message : string
}

export type ResetPasswordRequest = {
    token : string
    new_password : string
}

export type ResetPasswordResponse = {
    message : string
}

// type ResetPasswordRequest struct {
// 	Token		string		`json:"token"`
// 	NewPassword	string		`json:"new_password"`
// }

// type ResetPasswordResponse struct {
// 	Message		string		`json:"message"`
// }