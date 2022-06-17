import {configureStore} from '@reduxjs/toolkit'
import infoUserReducer from "./infoUserSlice";



const store = configureStore({
    reducer: {
        infoUser: infoUserReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export default store
