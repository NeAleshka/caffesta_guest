import axios from "axios";
import {IUserInfo, ILoginResponse, IUserDTO, IAuthMe} from "./interfaces";


const instants=axios.create({
    baseURL: 'http://localhost:5000/auth/',
    withCredentials: true
})

const userApi={
    reg(data:IUserInfo){
      return instants.post<IUserInfo,{ data: ILoginResponse}>('registration',{...data}).then(res=>res.data)
    },
    me(refreshToken: string){
        return instants.get('authMe', {
            headers: {
                'cookies': refreshToken
            }
        }).then(res=>res.data)
    },
    userVerification( verificationCode: string){
        return instants.post<{data:{verificationCode:string,login:string} },{data: { isVerification: boolean, message: string,userData:IUserDTO }}>('verification',{verificationCode}).then(res=>res.data)
    },
    sendVerificationCode(email:string,login:string){
        return instants.post<{email:string,login:string}, { data: { isVerification: boolean }}>('confirm_email',{email,login}).then(res=>res.data)
    },
    login(login:string,password:string){
        return instants.post<{login:string,password:string},{ data: ILoginResponse}>('login',{login,password}).then(res=>res.data)
    },
    logout(){
        return instants.post('logout')
    },
    changeInfo(data:IUserDTO) {
        return instants.put<IUserDTO, { data: IUserDTO }>('change_info',{...data}).then(res=>res.data)
    }
}

export default userApi
