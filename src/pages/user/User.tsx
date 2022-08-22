import {Route, Routes, useNavigate} from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import React, {useEffect} from "react";
import InfoUser from "./infoUser/InfoUser";
import Accumulation from "./accumulation/accumulation";
import QRCode from "./qrCode/QRCode";
import PreLoader from "../../components/PreLoader";

const User = () => {
    let isLogin = useSelector<RootState, boolean>(state => state.infoUser.isLogin as boolean)
    let isInitialized = useSelector<RootState, boolean>(state => state.infoUser.isInitialized as boolean)
    const navigate = useNavigate()
    const isLoading = useSelector<RootState, boolean>(state => state.infoUser.isLoading as boolean)
    const isOnline=navigator.onLine

    useEffect(() => {
        if ( isOnline && !isLogin && isInitialized ) {
            navigate('/')
        }
    }, [isInitialized, isLogin])

    useEffect(()=>{
        if (!isOnline){
            isLogin=true
            isInitialized=true
        }
    },[isOnline])


    return ( isLogin && isInitialized ?
        <div>
            {isLoading ? <PreLoader loading={isLoading}/> :
                <Routes>
                    <Route path={'info'} element={<InfoUser/>}/>
                    <Route path={'accumulation'} element={<Accumulation/>}/>
                    <Route path={'qr_code'} element={<QRCode/>}/>
                </Routes>}
            <Footer/>
        </div>:<div>Offline</div>)
}

export default User
