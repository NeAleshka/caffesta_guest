export interface IAuthMe {
    userData?: IUserDTO,
    success: boolean
    error?:IErrorRequest
}

export interface ILoginResponse {
    userData?: IUserData
    success: boolean
    error?:IErrorRequest
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
    userData?: IUserDTO
    success:boolean
    error?:IErrorRequest
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

export interface IErrorRequest{
    code:number
    message?:string
    label:string
}
