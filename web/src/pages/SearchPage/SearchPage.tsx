import { useEffect } from "react";
import styles from "./SearchPage.module.scss";
import { Outlet } from "react-router-dom";
import { apiOstarbaiters } from "../../api/ApiRequest";
import { useDispatch } from "react-redux";
import { apiGetPeople } from "../../store/basic/people.slice";

function SearchPage() {
  const dispacth = useDispatch();

  useEffect(() => {
    apiOstarbaiters().then((req) => {
      if (req?.status === 200) {
        dispacth(apiGetPeople({ ostarbaiters: req.data?.ostarbaiters }));
        console.log("req.data", req.data.ostarbaiters);
      }
    });
  }, []);

  return (
    <div className={styles.SearchPage}>
      <Outlet />
    </div>
  );
}

export default SearchPage;
