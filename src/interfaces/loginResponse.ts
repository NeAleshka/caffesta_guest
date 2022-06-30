export interface LoginResponse {
    userData:userData
    isLogin: boolean
}

interface userData {
    user: userDTO
    accessToken: string
    refreshToken: string
}

export interface userDTO{
    name:string,
    lastName:string,
    email:string,
    phone:string
}

export interface infoUserType{
    phone: string
    email?: string
    name: string
    lastName: string
    login: string,
    password: string
    birthday?: string
}
