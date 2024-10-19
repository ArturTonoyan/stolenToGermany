import AdminAuth from "../../../components/AdminAuth/AdminAuth";
import Form from "../../../components/Form/Form";
import styles from "./AdminPageAuth.module.scss";
function AdminPageAuth(props: any) {
  return (
    <div className={styles.AdminPageAuth}>
      <AdminAuth setAutorization={props.setAutorization} />
    </div>
  );
}

export default AdminPageAuth;
