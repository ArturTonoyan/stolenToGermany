import { useState } from "react";
import Form from "../../components/Form/Form";
import styles from "./AdminAuth.module.scss";
import { useForm, SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { Auth } from "../../api/ApiRequest";


type Auth = {
    email: string
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

      const onSubmit: SubmitHandler<Auth> = (data) => {
        const datas = {
            email: data.email,
            password: data.password
        };
        Auth(datas).then((response: any) => {
            if (response && response.status === 200) {
                localStorage.setItem("access_token", response?.data?.token);
                // console.log("access_token", response);
                navigate("/AdminPage/AdminPanelModule");
            } else {
                setErrorMessage(true);
            }
        });
    };
    
      

    const [ErrorMessage, setErrorMessage] = useState<boolean>(false)
  return (
    <div className={styles.AdminAuth}>
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.AdminAuthInput}>
                    <input placeholder="Логин" maxLength={50}  {...register("email", { required: true, maxLength: 50 })} />
                    {errors.email && errors.email.type === "required" && (
                        <span>Поле обязательно к заполнению*</span>
                    )}
                </div>
                <div className={styles.AdminAuthInput}>
                    <input placeholder="Пароль" type="password" maxLength={50} {...register("password", { required: true, maxLength: 20 })} />
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
