export interface IAuthMe {
    userData: IUserDTO,
    isLogin: boolean
}

export interface ILoginResponse {
    userData: IUserData
    isLogin: boolean
}

interface IUserData {
    user: IUserDTO
    accessToken: string
    refreshToken: string
}

export interface IUserDTO {
    name?: string,
    lastName?: string
    email?: string
    phone?: string
    bonuses?:IBonuses
    cardNumber?:string
    id?:string
    organizationInfo?:IOrganizationInfo
}

export interface IUserInfo {
    phone: string
    email?: string
    name: string
    lastName: string
    login: string
    password: string
    birthday?: string
}

export interface IRejectResponse {
    data: {
        isLogin: boolean
        message: string
    }
}

export interface IVerificationResponse{
    userData: IUserDTO
    isVerification:boolean
    message:string
}

export interface IVerificationReject{
    isVerification: boolean
    message: string
}

export interface IBonuses{
    bonus:number
    points:number
    check:number
    sum:number
}

export interface IOrganizationInfo {
    name:string
    logo:string
}
