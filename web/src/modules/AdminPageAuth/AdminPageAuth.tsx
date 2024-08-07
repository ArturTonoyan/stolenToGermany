import AdminAuth from "../../components/AdminAuth/AdminAuth";
import Form from "../../components/Form/Form";
import styles from "./AdminPageAuth.module.scss";
function AdminPageAuth() {
  return (
    <div className={styles.AdminPageAuth}>
       <AdminAuth/>
    </div>
  );
}

export default AdminPageAuth;
