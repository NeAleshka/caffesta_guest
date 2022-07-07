import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import React, {useEffect} from "react";
import InfoUser from "./infoUser/InfoUser";
import Accumulation from "./accumulation/accumulation";
import QRCode from "./qrCode/QRCode";

const User = () => {
    const isLogin = useSelector<RootState, boolean>(state => state.infoUser.isLogin)
    const isInitialized = useSelector<RootState, boolean>(state => state.infoUser.isInitialized)
    const navigate = useNavigate()
    const pathName=useLocation().pathname



    useEffect(() => {
        if (!isLogin && isInitialized) {
            navigate('/')
        }
    }, [isInitialized, isLogin])
    useEffect(()=>{
        navigate(`${pathName}`)
    },[pathName])

    return (isLogin && isInitialized ?
        <div>
            <Routes>
                <Route path={'info'} element={<InfoUser/>}/>
                <Route path={'accumulation'} element={<Accumulation/>}/>
                <Route path={'qr_code'} element={<QRCode/>}/>
            </Routes>
            <Footer/>
        </div> : <></>)
}

export default User
