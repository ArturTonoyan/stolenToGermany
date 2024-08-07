import { useState } from "react";
import Form from "../../components/Form/Form";
import styles from "./AdminAuth.module.scss";
import { useForm, SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom";



type Auth = {
    Login: string
    password: string
  }

  
function AdminAuth() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm<Auth>()

      const onSubmit: SubmitHandler<Auth> = (data) =>{
        console.log(data)
        reset()
        if(data.Login === "admin" && data.password === "123"){
            navigate("/AdminPage/AdminPanelModule")
        }else{
            setErrorMessage(true)
        }
      }
      

    const [ErrorMessage, setErrorMessage] = useState<boolean>(false)
  return (
    <div className={styles.AdminAuth}>
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.AdminAuthInput}>
                    <input placeholder="Логин" maxLength={50} {...register("Login", { required: true, maxLength: 50 })} />
                    {errors.Login && errors.Login.type === "required" && (
                        <span>Поле обязательно к заполнению*</span>
                    )}
                </div>
                <div className={styles.AdminAuthInput}>
                    <input placeholder="Пароль" maxLength={50} {...register("password", { required: true, maxLength: 20 })} />
                    {errors.password && errors.password.type === "required" && (
                        <span>Поле обязательно к заполнению*</span>
                    )}
                </div>
             
                <div className={styles.SubmitButton}>
                    <input type="submit" value="Авторизироваться"/>
                </div>
            </form>
           
            {ErrorMessage &&
             <div className={styles.ErrorMessage}>
                <p>Неверный логин или пароль, пожалуйста повторите попытку*</p>
            </div>
          }
        </div>
    </div>
  );
}

export default AdminAuth;
