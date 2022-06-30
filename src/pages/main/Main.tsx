import styles from './main.module.css'
import {Outlet, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {useEffect} from "react";

const Main=()=>{
    const isLogin=useSelector<RootState,boolean>(state => state.infoUser.isLogin)
    const navigate=useNavigate()

    useEffect(()=>{
        if (isLogin){
            navigate('/user/qr_code')
        }
    },[isLogin])

    return(
        <div className={styles.flexCol}>
            <main>
                <div className={styles.container}>
                    <section className={styles.sec_login}>
                        <div className="form">
                            <form className={styles.form__body} >
                                <button className={styles.type1}
                                        onClick={()=>navigate('/sing_up')}>
                                    <div className={styles.button_text}>Зарегистрироваться</div>
                                </button>
                            </form>
                            <form className={styles.form__body} >
                                <button className={`${styles.type1} ${styles.type2}`}
                                        onClick={()=>navigate('/sing_in')}>
                                    <div className={styles.button_text} >Уже клиент заведения?</div>
                                </button>
                            </form>
                        </div>
                    </section>
                </div>
            </main>
            <Outlet/>
        </div>
    )
}

export default Main
