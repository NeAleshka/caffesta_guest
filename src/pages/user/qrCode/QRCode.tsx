import container from '../../../components/LayOut/LayOut.module.css'
import style from './qrCode.module.css'
import QRcode from '../../../images/qr-code.png'
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";


const QRCode = () => {
    const isLogin = useSelector<RootState, boolean>(state => state.infoUser.isLogin)
    const navigate = useNavigate()

   useEffect(()=>{
       if (!isLogin){
           navigate('/')
       }
   },[isLogin])

    return (
        <div className={container.container}>
            <section className={style.wrapper}>
                <div>Здравствуйте,<br/>Caffesta Support!</div>
                <div className={style.titleQr}>Ваш личный QR-код</div>
                <div><img className={style.qrWrapper} src={QRcode} alt={'QRcode'}/></div>
                <div className={style.descrBottom}>Предъявите его кассиру перед оплатой для начисления бонусов</div>
            </section>
        </div>
    )
}

export default QRCode
