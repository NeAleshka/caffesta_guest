import style from './sendMessage.module.css'
import container from '../../components/LayOut/LayOut.module.css'
import otherStyle from '../sing_up/singUp.module.css'
import {useFormik} from "formik";
import {useNavigate} from "react-router-dom";
type FormikError ={
    email?:string
}

const SendMessage = () => {
    const navigate=useNavigate()
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
              <div className={otherStyle.description}>Для входа нужно указать <span className={style.nowrap}>E-mail,</span> <span
                  className={style.nowrap}>с которого</span> была регистрация <span
                  className={style.nowrap}>и ввести</span> полученный код
              </div>
              <div className="form">
                  <form className={otherStyle.form_body} onSubmit={formik.handleSubmit} >
                      <div className={otherStyle.form__item}>
                          <label className={style.label}>Введите Ваш E-mail</label>
                          <input className={style.valid}
                                 placeholder="example@company.com"
                                 {...formik.getFieldProps('email')}/>
                      </div>
                      {formik.touched.email && formik.errors.email && <div>{formik.errors.email}</div>}
                      <button className={`${otherStyle.submitButton} ${style.send_button} ${checkInputs()?otherStyle.submitButtonError:""}`} type="submit"
                              disabled={checkInputs()}
                              onClick={()=>{navigate('/confirm_email',{state:formik.values})}}>Получить
                          код
                      </button>
                  </form>
              </div>
          </section>
          </div>
  )
}
export default SendMessage
