import {userDTO} from "./loginResponse";

export interface AuthMeBadResponse{
    isLogin:boolean,
    message:string,
}

export interface AuthMe{
    userData:userDTO,
    isLogin:boolean
}
