import container from '../../../components/LayOut/LayOut.module.css'
import inputStyle from '../../sing_up/singUp.module.css'
import infoStyle from './InfoUser.module.css'
import {useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {infoUserType} from "../../../store/infoUserSlice";
import {RootState} from "../../../store";
import {changeInfo}from '../../../store/infoUserSlice'

const InfoUser = () => {
    const isNoEdit=useSelector<RootState,boolean>(state => state.infoUser.isEdit)
    const disabledStyle=isNoEdit?`${infoStyle.disabled}`:''
    const dataUser=useSelector<RootState,infoUserType>(state => state.infoUser.info)
    const dispatch=useDispatch()

    const [infoUser,setInfoUser]=useState(dataUser)

    const changePhone=(phone:string)=>{
       setInfoUser({...infoUser,phone})
    }
    const changeEmail=(email:string)=>{
       setInfoUser({...infoUser,email})
    }
    const changeName=(name:string)=>{
        setInfoUser({...infoUser,name})
    }
    const changeLastName=(lastName:string)=>{
        setInfoUser({...infoUser,lastName})
    }

    return (
        <div className={container.container}>
            <div className={inputStyle.form_body}>
                <h3 style={{fontWeight: '400', marginTop: '30px'}}>User Name</h3>
                <div className={`${inputStyle.form__item} ${infoStyle.form_body}`}>
                    <input className={`${inputStyle.input_data} ${disabledStyle}`}  disabled={isNoEdit}
                    value={infoUser.phone}
                    onChange={(event)=>changePhone(event.currentTarget.value)}
                    />
                </div>
                <div className={inputStyle.form__item}>
                    <input className={`${inputStyle.input_data} ${disabledStyle}`}  disabled={isNoEdit}
                           onChange={(event)=>changeEmail(event.currentTarget.value)}
                           value={infoUser.email}/>
                </div>
                <div className={inputStyle.form__item}>
                    <input className={`${inputStyle.input_data} ${disabledStyle}`}  disabled={isNoEdit}
                            onChange={(event)=>changeName(event.currentTarget.value)}
                           value={infoUser.name}/>
                </div>
                <div className={inputStyle.form__item}>
                    <input className={`${inputStyle.input_data} ${disabledStyle}`}
                           onChange={(event)=>changeLastName(event.currentTarget.value)}
                           disabled={isNoEdit}
                           value={infoUser.lastName}/>
                </div>
                <button className={`${infoStyle.button} ${infoStyle.blue_button} ${isNoEdit?'':infoStyle.save_change}` }
                onClick={()=>dispatch(changeInfo({infoUser,isNoEdit}))}>
                    {isNoEdit?'Редактировать профиль':'Сохранить'}
                </button>
                <button className={`${infoStyle.button} ${infoStyle.button_red}`} style={isNoEdit?{}:{display:"none"}}>Выйти</button>
            </div>
        </div>
    )
}
export default InfoUser
