import {createAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import userApi from "../api";
import {
    IAuthMe,
    ILoginResponse,
    IRejectResponse,
    IUserDTO,
    IUserInfo,
    IVerificationReject,
    IVerificationResponse
} from "../interfaces";


export const registrationUser = createAsyncThunk<ILoginResponse, IUserInfo, {
    rejectValue: IRejectResponse
}>(
    'infoUser/registrationUser',
    async (data: IUserInfo, {rejectWithValue}) => {
        try {
            return await userApi.reg(data)
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

export const authMe = createAsyncThunk<IAuthMe, string>(
    'infoUser/authMe',
    async (refreshToken, {rejectWithValue, dispatch}) => {
            // dispatch(setIsLoading(true))

        try {
            return await userApi.me(refreshToken)
            } catch (e) {
            return rejectWithValue(e.response.data.isLogin)
        }
        /*finally {
            dispatch(setIsLoading(false))
        }*/
    }
)


export const verificationUser = createAsyncThunk<IVerificationResponse, string, {
    rejectValue: IVerificationReject
}>(
    'infoUser/verification',
    async (verificationCode, {rejectWithValue}) => {
        try {
            return await userApi.userVerification(verificationCode)
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

export const sendVerificationCode = createAsyncThunk<{ isVerification: boolean }, { email: string, login: string }, { rejectValue: { isVerification: boolean, message: string } }>(
    'infoUser/sendVerificationCode',
    async ({email, login}, {rejectWithValue}) => {
        try {
            return await userApi.sendVerificationCode(email, login)
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)


export const login = createAsyncThunk<ILoginResponse, { login: string, password: string }, {
    rejectValue: { isVerification: boolean, message: string }
}>('infoUser/login',
    async ({login, password}, {rejectWithValue, dispatch}) => {
        try {
            return await userApi.login(login, password)
        } catch (e) {
            return rejectWithValue(e.response.data)
        } finally {
        }
    })

export const logout = createAsyncThunk(
    'infoUser/logout',
    async () => {
        try {
            return await userApi.logout()
        } catch (e) {
            console.log(e)
        }
    })

export const changeUserInfo = createAsyncThunk<IUserDTO, IUserDTO, { rejectValue: { message: string } }>(
    'infoUser/changeInfo',
    async (data, {rejectWithValue, dispatch}) => {
        try {
            return userApi.changeInfo(data)
        } catch (e) {
            return rejectWithValue(e)
        }
    }
)

export const setIsEdit = createAction('infoUser/setIsEdit', (isEdit: boolean = false) => {
    return {
        payload: {
            isEdit
        },
    }
})

export const setIsLoading = createAction('infoUser/setIsLoading',
    (isLoading) => {
        return {
            payload: {
                isLoading
            }
        }
    })

const initial: IUserDTO = {
    phone: 'Нет данных',
    email: 'Нет данных',
    name: 'Нет данных',
    lastName: 'Нет данных',
    bonuses: {
        bonus: 0,
        points: 0,
        check: 0,
        sum: 0
    },
    cardNumber: '',
    id: '',
    organizationInfo: {
        name: '',
        logo: ''
    }
}


const infoUserSlice = createSlice({
    name: "infoUser",
    initialState: {
        isEdit: true,
        isLogin: false,
        isVerification: false,
        isSuccessRequest: false,
        info: initial,
        requestMessage: '',
        isLoading: false,
        isInitialized: false,
    },
    reducers: {
        changeInfo(state, action) {
            state.isEdit = !state.isEdit
            state.info = action.payload
        },
      /*  setIsLoading(state, action) {
            state.isLoading = action.payload.isLoading
        }*/
    },


   /* extraReducers:{
        //@ts-ignore
        [authMe.pending]:(state)=>{
            state.isLoading=true
        },
        //@ts-ignore
        [authMe.fulfilled]:(state,{payload})=>{
            state.isLoading=false
        }
    }*/

    extraReducers: (builder) => {
      /*  //@ts-ignore
        [authMe.pending]:(state)=>{
            state.isLoading=true
        },
        [authMe.fulfilled]:(state,{payload})=>{
            state.isLoading=false
        }*/
        builder
            .addCase(registrationUser.fulfilled, (state, action) => {
                state.requestMessage = ''
                state.isSuccessRequest = action.payload.isLogin
            })
            .addCase(registrationUser.rejected, (state, action) => {
                if (action.payload) {
                    state.requestMessage = action.payload.data.message
                    state.isSuccessRequest = action.payload.data.isLogin
                }

            })
            .addCase(authMe.pending, (state) => {
                state.requestMessage = ''
                state.isLoading = true
                console.log('pending', state)
            })
            .addCase(authMe.fulfilled, (state, {payload}) => {
                // console.log(action.payload)
                /*if (payloadaction.payload) {
                }*/
                console.log('fulfilled', state)
                    state.isLogin = payload.isLogin
                    state.info = payload.userData
                state.requestMessage = ''
                state.isLoading=false
                console.log('fulfilled', state)
                state.isInitialized = true
            })
            .addCase(authMe.rejected, (state, action) => {
                /*if (action.payload) {
                }*/
                console.log('rejected', state)
                    state.isLogin = false
                state.isLoading = false
                console.log('rejected', state)
                state.isInitialized = true
            })
            .addCase(verificationUser.fulfilled, (state, action) => {
                state.requestMessage = ''
                state.isSuccessRequest = false
                if (action.payload) {
                    state.isLogin = action.payload.isVerification
                    state.info = action.payload.userData
                    if (action.payload.userData.organizationInfo) {
                        localStorage.setItem('logo', action.payload.userData.organizationInfo.logo)
                        localStorage.setItem('organizationName', action.payload.userData.organizationInfo.name)
                    }
                }
            })
            .addCase(verificationUser.rejected, (state, action) => {
                state.isSuccessRequest = false
                if (action) {
                    state.requestMessage = action.payload?.message as string
                }
            })

            .addCase(sendVerificationCode.fulfilled, (state, action) => {
                state.requestMessage = ''
                state.isVerification = action.payload?.isVerification
            })
            .addCase(sendVerificationCode.rejected, (state, action) => {
                if (action.payload) {
                    state.isVerification = action.payload.isVerification
                    state.requestMessage = action.payload.message
                }
            })
            .addCase(login.fulfilled, (state, action) => {

                state.requestMessage = ''
                state.isLogin = action.payload.isLogin
                state.info = action.payload.userData.user
                if (action.payload.userData.user.organizationInfo) {
                    localStorage.setItem('accessToken', action.payload.userData.accessToken)
                    localStorage.setItem('logo', action.payload.userData.user.organizationInfo.logo)
                    localStorage.setItem('organizationName', action.payload.userData.user.organizationInfo.name)
                }
            })
            .addCase(login.rejected, (state, action) => {
                if (action.payload) {
                    state.isLogin = action.payload.isVerification
                    state.requestMessage = action.payload.message
                }
            })
            .addCase(logout.fulfilled, (state) => {
                state.requestMessage = ''
                state.isLogin = false
                state.isVerification = false
                state.isSuccessRequest = false
            })
            .addCase(changeUserInfo.fulfilled, (state, action) => {
                state.isEdit = true
                state.info = action.payload

            })
            .addCase(changeUserInfo.rejected, (state) => {
                state.isEdit = true
            })
            .addCase(setIsEdit, (state, action) => {
                state.isEdit = action.payload.isEdit
            })
            /*.addCase(setIsLoading, (state, action) => {
                state.isLoading = action.payload.isLoading
            })*/
    }
})

export const {changeInfo} = infoUserSlice.actions
export default infoUserSlice.reducer
