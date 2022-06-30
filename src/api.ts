import axios from "axios";
import {AuthMe, infoUserType, LoginResponse, userDTO} from "./interfaces";

const instants=axios.create({
    baseURL:'http://localhost:5000/auth/',
})


instants.interceptors.request.use((config)=>{
    if (config.headers)
   config.headers.Authorization=`Bearer ${localStorage.getItem('accessToken')}`
    return config
})



const userApi={
    reg(data:infoUserType){
      return instants.post<'',{ data: LoginResponse}>('registration',{...data})
    },
    me(){
        return instants.get('authMe').then(res=>res.data)
    },
    userVerification( data:{verificationCode: string, login: string}){
        return instants.post<{data:{verificationCode:string,login:string} },{data: { isVerification: boolean, message: string,userData:userDTO }}>('verification',{...data})
    },
    fetchInfo(login:string){
        return instants.post<'', {data: userDTO }>('user/info',{login})
    },
    sendVerificationCode(email:string,login:string){
        return instants.post<{email:string,login:string}, { data: { isVerification: boolean } }>('confirm_email',{email,login})
    },
    login(login:string,password:string){
        return instants.post<{login:string,password:string},{ data: LoginResponse}>('login',{login,password}).then(res=>res.data)
    }
}

export default userApi
