import style from '../send_message/sendMessage.module.css'
import container from '../../components/LayOut/LayOut.module.css'
import otherStyle from '../sing_up/singUp.module.css'
import {useFormik} from "formik";
import {useLocation, useNavigate} from "react-router-dom";
type FormikError ={
    email?:string
}

interface CustomizedState {
    email: string
}

const SendMessage = () => {
    const navigate=useNavigate()
    const location=useLocation()
    const state = location.state as CustomizedState
    const { email:userEmail } = state;
    const formik=useFormik({
        initialValues:{
            email:''
        },
        validate:(values)=>{
            const errors:FormikError={}
            if (values.email.length) {
                if (!/^[A-Z\d._%+-]+@[A-Z\d.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                    errors.email = 'Неверный формат'
                }
            }
            return errors
        },
        onSubmit:values => {
            alert(JSON.stringify(values))
        }
    })
    const checkInputs = () => {
        return (!!Object.keys(formik.errors).length || !formik.getFieldProps('email').value)
    }

    return(
        <div className={container.container}>
            <section className={style.sec_conf_1}>
                <div className={otherStyle.description}>На почтовый ящик:  <span className={style.nowrap}>"{userEmail}",</span> <span
                    className={style.nowrap}>был отправлен код</span> для подтверждения регистрации
                </div>
                <div className="form">
                    <form className={otherStyle.form_body} onSubmit={formik.handleSubmit} >
                        <div className={otherStyle.form__item}>
                            <label className={style.label}>Введите полученный код</label>
                            <input className={style.valid}
                                   placeholder="0000000"
                                   type={'number'}
                                   {...formik.getFieldProps('email')}/>
                        </div>
                        {formik.touched.email && formik.errors.email && <div>{formik.errors.email}</div>}
                        <button className={`${otherStyle.submitButton} ${style.send_button} ${checkInputs()?otherStyle.submitButtonError:""}`} type="button"
                                disabled={checkInputs()}
                                onClick={()=>{navigate('/user/qr_code')}}>Войти в аккаунт
                        </button>
                    </form>
                </div>
            </section>
        </div>
    )
}
export default SendMessage
