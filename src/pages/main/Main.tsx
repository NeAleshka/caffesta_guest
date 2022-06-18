import styles from './main.module.css'
import {Outlet, useNavigate} from "react-router-dom";

const Main=()=>{
    const navigate=useNavigate()
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
