import inputStyle from '../../sing_up/singUp.module.css'
import container from '../../../components/LayOut/LayOut.module.css'
import styles from "../../sing_up/singUp.module.css";
import accStyle from './accumulation.module.css'

const Accumulation = () => {
    const bonus = 'Бонусы: 864'
    const points = 'Баллы: 47'
    const check = 'Счёт: 0 р.'
    const sum = 'Сумма покупок: 32454 р.'

    const validDate = () => {
        const date=new Date()
        let day:string|number=date.getUTCDate()
        let month:string|number=date.getUTCMonth()+1
        if(day<=9){
            day=`0${day}`
        }
        if(month<=9){
            month=`0${month}`
        }
        return`${day}.${month}.${date.getUTCFullYear()}`
    }

    const getCorrectMin = () => {
        const min=new Date().getMinutes()
      if(min<=9) return `0${min}`
        return min
    }

    const getCorrectHours = () => {
        const hours=new Date().getHours()
        if(hours<=9) return `0${hours}`
        return hours
    }

    const date=validDate()
    const time=`${getCorrectHours()}:${getCorrectMin()}`


    return (
        <div className={`${container.container} ${accStyle.flex}`}>
            <div className={accStyle.description}>Ваши накопления на <br/> {date} г.,{time}</div>
            <div className={styles.form_body}>
                <div className={inputStyle.form__item}>
                    <input className={`${styles.input_data} ${accStyle.input}`} value={bonus} readOnly/>
                </div>
                <div className={inputStyle.form__item}>
                    <input className={`${styles.input_data} ${accStyle.input}`} value={points}/>
                </div>
                <div className={inputStyle.form__item}>
                    <input className={`${styles.input_data} ${accStyle.input}`} value={check}/>
                </div>
                <div className={inputStyle.form__item}>
                    <input className={`${styles.input_data} ${accStyle.input}`} value={sum}/>
                </div>
            </div>
        </div>
    )
}
export default Accumulation
