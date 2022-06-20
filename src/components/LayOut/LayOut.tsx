import styles from "./LayOut.module.css";
import logo from "../../images/logo.svg";


const LayOut=()=>{
    return(
        <div className={styles.flexCol}>
            <header className={styles.header}>
                <div className={styles.container}>
                    <div className={styles.logo}><img src={logo} alt="logo"/>
                        <a className={styles.logoTitle} href="/caffesta_guest">Caffesta</a></div>
                </div>
            </header>
        </div>
    )
}

export default LayOut
