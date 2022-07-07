import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import infoUserReducer from "./infoUserSlice";
import {useDispatch} from "react-redux";



const store = configureStore({
    reducer: {
        infoUser: infoUserReducer
    },
   /* middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),*/
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export default store
