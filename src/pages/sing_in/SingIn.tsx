import {useFormik} from "formik";
import styles from '../sing_up/singUp.module.css'
import mainStyles from '../../components/LayOut/LayOut.module.css'
import user from "../../images/input_icons/user.svg";
import {useNavigate} from "react-router-dom";

type FormikErrorType = {
    login?: string
    password?: string

}


const SingIn = () => {
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            login: '',
            password: '',

        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.login) {
                errors.login = "Обязательное поле"
            } else if (values.login.length < 4) {
                errors.login = 'Минимальная длина 4 символа'
            }
            if (!values.password) {
                errors.password = "Обязательное поле"
            } else if (values.password.length < 4) {
                errors.password = 'Минимальная длина 4 символа'
            }
            return errors
        },
        onSubmit: values => {
            alert(JSON.stringify(values))// Переделать на post
        }
    })
    const checkInputs = () => {
        return (!!Object.keys(formik.errors).length || !formik.getFieldProps('login').value)
    }
    return(
        <div className={`${mainStyles.wrapper} ${mainStyles.flexCol}`}>
            <main>
                <div className={mainStyles.container}>
                    <section className={styles.secRegister}>
                        <div className={styles.description}>Введите Логин и<br/> Пароль указанные
                        <br/>при регистрации
                        </div>
                        <div className="form">
                            <form className={styles.form_body} onSubmit={formik.handleSubmit}>
                                <div className={styles.form__item}>
                                    <input className={styles.input_data} type="text"
                                           placeholder="Логин"
                                           {...formik.getFieldProps('login')}
                                    />
                                    <div className={styles.input_icons}>
                                        <img src={user} alt={'login'}/>
                                    </div>
                                    {formik.touched.login && formik.errors.login && <div className={styles.formik_errors}>{formik.errors.login}</div>}
                                </div>
                                <div className={styles.form__item}>
                                    <input className={styles.input_data} type="password"
                                           placeholder="Пароль"
                                           {...formik.getFieldProps('password')}
                                    />
                                    <div className={styles.input_icons}>
                                        <img src={user} alt={'pass'}/>
                                    </div>
                                    {formik.touched.password && formik.errors.login && <div className={styles.formik_errors}>{formik.errors.password}</div>}
                                </div>
                                <button
                                    className={`${styles.submitButton} ${checkInputs() ? styles.submitButtonError : ''}`
                                    } type="submit" disabled={checkInputs()} onClick={() => navigate('/send_message')}
                                >Вход
                                </button>
                            </form>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}

export default SingIn
