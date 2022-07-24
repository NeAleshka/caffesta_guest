import styles from './main.module.css'
import {Outlet, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../store";
import {setIsLoading} from "../../store/infoUserSlice";

const Main=()=>{
    const isLogin=useSelector<RootState,boolean>(state => state.infoUser.isLogin)
    const navigate=useNavigate()
    const dispatch=useAppDispatch()

    if(isLogin){
        navigate('/user/qr_code')
    }

    const onClick = () => {
        dispatch(setIsLoading(true))
        navigate('/sing_up')
    }

    return(
        <div className={styles.flexCol}>
            <main>
                <div className={styles.container}>
                    <section className={styles.sec_login}>
                        <div className="form">
                            <form className={styles.form__body} >
                                <button className={styles.type1}>
                                    <div className={styles.button_text}
                                         onClick={()=>onClick()}
                                    >Зарегистрироваться</div>
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
