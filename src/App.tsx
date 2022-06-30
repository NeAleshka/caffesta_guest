import React, {useEffect} from 'react';
import './App.css';
import Main from "./pages/main/Main";
import {Route, Routes} from "react-router-dom";
import SingUp from "./pages/sing_up/SingUp";
import LayOut from "./components/LayOut/LayOut";
import SendMessage from "./pages/send_message/SendMessage";
import ConfirmEmail from "./pages/confirmEmail/ConfirmEmail";
import InfoUser from "./pages/user/infoUser/InfoUser";
import Accumulation from "./pages/user/accumulation/accumulation";
import User from "./pages/user/User";
import QRCode from "./pages/user/qrCode/QRCode";
import SingIn from "./pages/sing_in/SingIn";
import {useAppDispatch} from "./store";
import {authMe} from './store/infoUserSlice'


function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(authMe())
    }, [])


    return (
        <div className="App">
            <LayOut/>
            <Routes>
                <Route path={'/'} element={<Main/>}/>
                <Route path={'/sing_up'} element={<SingUp/>}/>
                <Route path={'/send_message'} element={<SendMessage/>}/>
                <Route path={'/confirm_email'} element={<ConfirmEmail/>}/>
                <Route path={'/sing_in'} element={<SingIn/>}/>
                <Route path={'/user'} element={<User/>}>
                    <Route path={'/user/info'} element={<InfoUser/>}/>
                    <Route path={'/user/accumulation'} element={<Accumulation/>}/>
                    <Route path={'/user/qr_code'} element={<QRCode/>}/>
                </Route>
            </Routes>
        </div>

    );
}

export default App;
