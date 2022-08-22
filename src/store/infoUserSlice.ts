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
    async (data: IUserInfo, {rejectWithValue, dispatch}) => {
        dispatch(setIsLoading(true))
        try {
            return await userApi.reg(data)
        } catch (e) {
            return rejectWithValue(e.response.data)
        } finally {
            dispatch(setIsLoading(false))
        }
    }
)

export const authMe = createAsyncThunk<IAuthMe, string>(
    'infoUser/authMe',
    async (refreshToken, {rejectWithValue, dispatch}) => {
        dispatch(setIsLoading(true))
        try {
            return await userApi.me(refreshToken)
        } catch (e) {
            return rejectWithValue(e.response.data.isLogin)
        } finally {
            dispatch(setIsLoading(false))
        }
    }
)


export const verificationUser = createAsyncThunk<IVerificationResponse, string, {
    rejectValue: IVerificationReject
}>(
    'infoUser/verification',
    async (verificationCode, {rejectWithValue, dispatch}) => {
        dispatch(setIsLoading(true))
        try {
            return await userApi.userVerification(verificationCode)
        } catch (e) {
            return rejectWithValue(e.response.data)
        } finally {
            dispatch(setIsLoading(false))
        }
    }
)

export const sendVerificationCode = createAsyncThunk<{ isVerification: boolean }, { email: string, login: string }, { rejectValue: { isVerification: boolean, message: string } }>(
    'infoUser/sendVerificationCode',
    async ({email, login}, {rejectWithValue, dispatch}) => {
        dispatch(setIsLoading(true))
        try {
            return await userApi.sendVerificationCode(email, login)
        } catch (e) {
            return rejectWithValue(e.response.data)
        } finally {
            dispatch(setIsLoading(false))
        }
    }
)


export const login = createAsyncThunk<ILoginResponse, { login: string, password: string }, {
    rejectValue: { isVerification: boolean, message: string }
}>('infoUser/login',
    async ({login, password}, {rejectWithValue, dispatch}) => {
        dispatch(setIsLoading(true))
        try {
            return await userApi.login(login, password)
        } catch (e) {
            return rejectWithValue(e.response.data)
        } finally {
            dispatch(setIsLoading(false))
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
    async (data, {rejectWithValue}) => {
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
    (isLoading:boolean) => {
        return {
            payload: {
                isLoading
            }
        }
    })

const initial: IUserDTO = {
    phone: '',
    email: '',
    name: '',
    lastName: '',
    bonuses: {
        bonus: 0,
        points: 0,
        check: 0,
        sum: 0
    },
    cardNumber: "0000",
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
        setIsLoading(state, action) {
            state.isLoading = action.payload.isLoading
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(registrationUser.fulfilled, (state, action) => {
                state.requestMessage = ''
                state.isSuccessRequest = action.payload.isLogin
            })
            .addCase(registrationUser.rejected, (state, action) => {
                if (action.payload) {
                    state.requestMessage = action.payload.data.message || "Something Error"
                    state.isSuccessRequest = action.payload.data.isLogin
                }

            })
            .addCase(authMe.pending, (state) => {
                state.requestMessage = ''
            })
            .addCase(authMe.fulfilled, (state, action) => {
                if (action.payload) {
                    state.isLogin = action.payload.isLogin
                    state.info = action.payload.userData ?? initial
                }
                state.requestMessage = ''
                state.isInitialized = true
            })
            .addCase(authMe.rejected, (state,) => {
                state.isLogin = false
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
                    state.requestMessage = action.payload?.message as string || "Something Error"
                }
            })

            .addCase(sendVerificationCode.fulfilled, (state, action) => {
                state.requestMessage = ''
                state.isVerification = action.payload?.isVerification
            })
            .addCase(sendVerificationCode.rejected, (state, action) => {
                if (action.payload) {
                    state.isVerification = action.payload.isVerification
                    state.requestMessage = action.payload.message || "Something Error"
                }
            })
            .addCase(login.fulfilled, (state, action) => {
                state.requestMessage = ''
                state.isLogin = action.payload.isLogin
                state.info = action.payload.userData?.user
                if (action.payload.userData?.user?.organizationInfo) {
                    localStorage.setItem('accessToken', action.payload.userData.accessToken)
                    localStorage.setItem('logo', action.payload.userData.user.organizationInfo.logo)
                    localStorage.setItem('organizationName', action.payload.userData.user.organizationInfo.name)
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.isLogin = false
                state.requestMessage = action.payload?.message?? "Something Error"
            })
            .addCase(logout.pending, (state) => {
                state.isLoading = true
            })
            .addCase(logout.fulfilled, (state) => {
                state.requestMessage = ''
                state.isLogin = false
                state.isVerification = false
                state.isSuccessRequest = false
                state.isEdit = true
                state.isLoading = false
            })
            .addCase(changeUserInfo.fulfilled, (state, action) => {
                state.isEdit = true
                state.info = action.payload

            })
            .addCase(changeUserInfo.rejected, (state) => {
                state.isEdit = true
                state.requestMessage = "Something Error"
            })
            .addCase(setIsEdit, (state, action) => {
                state.isEdit = action.payload.isEdit
            })
    }
})

export const {changeInfo} = infoUserSlice.actions
export default infoUserSlice.reducer
