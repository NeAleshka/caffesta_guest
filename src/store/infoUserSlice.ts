import {createSlice} from "@reduxjs/toolkit"
export type infoUserType={
    phone:string
    email:string
    name:string
    lastName:string
}

const initial:infoUserType={
    phone:'+37529277216',
    email:'alexeybudai@gmail.com',
    name:'Alexey',
    lastName:'Budai'
}

const infoUserSlice=createSlice({
    name:"infoUser",
    initialState:{
        info:initial,
        isEdit:true
    },
    reducers:{
        changeInfo(state,action){
            state.isEdit=!state.isEdit
            state.info=action.payload
        },
    }
})

export const {changeInfo}=infoUserSlice.actions
export default infoUserSlice.reducer
