import styles from "./SearchPage.module.scss";
import { Outlet } from "react-router-dom";

function SearchPage() {
  return (
    <div className={styles.SearchPage}>
      <Outlet />
    </div>
  );
}

export default SearchPage;
