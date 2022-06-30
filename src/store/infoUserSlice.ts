import {createAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import userApi from "../api";
import {AuthMe, AuthMeBadResponse, infoUserType, LoginResponse, userDTO} from "../interfaces";


export const registrationUser = createAsyncThunk<{  data: LoginResponse } , infoUserType, {
    rejectValue: { data: { isLogin: boolean, message: string } }
}>(
    'infoUser/registrationUser',
    async (data: infoUserType, {rejectWithValue}) => {
        try {
            return await userApi.reg(data)
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

export const authMe = createAsyncThunk<AuthMe>(
    'infoUser/authMe',
    async ( _, {rejectWithValue}) => {
        try {
            return await userApi.me() //user
            //dispatch store
        } catch (e) {
            console.log(e.response.data.isLogin)
            return rejectWithValue(e.response.data.isLogin)
        }
    }
)


export const verificationUser = createAsyncThunk<{ data: { isVerification: boolean, message: string, userData: userDTO } }, { verificationCode: string, login: string }, {
    rejectValue: { isVerification: boolean, message: string }
}>(
    'infoUser/verification',
    async (param, {rejectWithValue}) => {
        try {
            return await userApi.userVerification(param)
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

export const fetchUserInfo = createAsyncThunk<{ data: userDTO }, string, { rejectValue: { message: string } }>(
    'infoUser/fetchUserInfo',
    async (login: string, {rejectWithValue}) => {
        try {
            return await userApi.fetchInfo(login)
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

export const sendVerificationCode = createAsyncThunk<{ data: { isVerification: boolean } }, { email: string, login: string }, { rejectValue: { isVerification: boolean, message: string } }>(
    'infoUser/sendVerificationCode',
    async ({email, login}, {rejectWithValue}) => {
        try {
            return await userApi.sendVerificationCode(email, login)
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)


export const login = createAsyncThunk< LoginResponse , { login: string, password: string }, {
    rejectValue: { isVerification: boolean, message: string }
}>('infoUser/login',
    async ({login, password}, {rejectWithValue}) => {
        try {
            return await userApi.login(login, password)
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    })

const initial: userDTO = {
    phone: 'Нет данных',
    email: 'Нет данных',
    name: 'Нет данных',
    lastName: 'Нет данных',
}

export const setFalseIsSuccessRequest = createAction('infoUser/setFalse')

const infoUserSlice = createSlice({
    name: "infoUser",
    initialState: {
        isEdit: true,
        isLogin: false,
        isVerification: false,
        isSuccessRequest: false,
        info: initial,
        requestMessage: '',
        isLoading:false,
    },
    reducers: {
        changeInfo(state, action) {
            state.isEdit = !state.isEdit
            state.info = action.payload
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(registrationUser.fulfilled, (state, action) => {
                state.isSuccessRequest = action.payload.data.isLogin
                localStorage.setItem('accessToken',action.payload.data.userData.accessToken)
                localStorage.setItem('refreshToken',action.payload.data.userData.refreshToken)
            })
            .addCase(registrationUser.rejected, (state, action) => {
                if (action.payload) {
                    state.requestMessage = action.payload.data.message
                    state.isSuccessRequest = action.payload.data.isLogin
                }
            })
            .addCase(authMe.pending,(state, action)=>{
                state.isLoading=true
            })
            .addCase(authMe.fulfilled, (state, action) => {
                if (action.payload) {
                    state.isLogin = action.payload.isLogin
                    state.info=action.payload.userData
                    state.isLoading=false
                }
            })
            .addCase(authMe.rejected, (state, action) => {
                if (action.payload) {
                    state.isLogin = action.payload as boolean
                }
            })
            .addCase(verificationUser.fulfilled, (state, action) => {
                if(action.payload){

                }
                state.isLogin = action.payload.data.isVerification
                state.info = action.payload.data.userData
            })
            .addCase(verificationUser.rejected, (state, action) => {
                if (action) {
                    state.requestMessage = action.payload?.message as string
                }
            })
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.info = action.payload.data
            })
            .addCase(setFalseIsSuccessRequest, (state, action) => {
                state.isSuccessRequest = false
            })
            .addCase(sendVerificationCode.fulfilled, (state, action) => {
                state.isVerification = action.payload.data?.isVerification
            })
            .addCase(sendVerificationCode.rejected, (state, action) => {
                if (action.payload) {
                    state.isVerification = action.payload.isVerification
                    state.requestMessage = action.payload.message
                }
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLogin = action.payload.isLogin
                state.info = action.payload.userData.user
                localStorage.setItem('accessToken',action.payload.userData.accessToken)
                localStorage.setItem('refreshToken',action.payload.userData.refreshToken)
            })
            .addCase(login.rejected, (state, action) => {
                console.log(action.payload)
                if (action.payload) {
                    state.isVerification = action.payload.isVerification
                    state.requestMessage = action.payload.message
                }
            })
    }
})

export const {changeInfo} = infoUserSlice.actions
export default infoUserSlice.reducer
