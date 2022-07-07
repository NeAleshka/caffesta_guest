import React, {useEffect} from 'react';
import './App.css';
import Main from "./pages/main/Main";
import {Route, Routes} from "react-router-dom";
import SingUp from "./pages/sing_up/SingUp";
import LayOut from "./components/LayOut/LayOut";
import SendMessage from "./pages/send_message/SendMessage";
import ConfirmEmail from "./pages/confirmEmail/ConfirmEmail";
import User from "./pages/user/User";
import SingIn from "./pages/sing_in/SingIn";
import {useAppDispatch} from "./store";
import {authMe} from './store/infoUserSlice'
import {CookiesProvider, useCookies} from "react-cookie";
import {Helmet} from 'react-helmet'

function App() {
    const dispatch = useAppDispatch()
    let [cookies, setCookies] = useCookies()
    useEffect(() => {
        //dispatch(setIsLoading(true))
        dispatch(authMe(cookies.refreshToken))
        //setTimeout(dispatch,5000,setIsLoading(false))
    }, [])

    return (
        <CookiesProvider>
            <Helmet>
                <title>{localStorage.getItem('organizationName')}</title>
                <link rel="icon" href={`${localStorage.getItem('organizationName')?localStorage.getItem('organizationName'): './public/favicon.ico'}`}/>
            </Helmet>
            <div className="App">
                <LayOut/>
                <Routes>
                    <Route path={'/'} element={<Main/>}/>
                    <Route path={'/sing_up'} element={<SingUp/>}/>
                    <Route path={'/send_message'} element={<SendMessage/>}/>
                    <Route path={'/confirm_email'} element={<ConfirmEmail/>}/>
                    <Route path={'/sing_in'} element={<SingIn/>}/>
                    <Route path={'/user/*'} element={<User/>}>
                    </Route>
                </Routes>
            </div>
        </CookiesProvider>
    );
}

export default App;
