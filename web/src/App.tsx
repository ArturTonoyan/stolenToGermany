import styles from "./styles/App.module.scss";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import SearchPage from "./pages/SearchPage/SearchPage";
import { Provider, useDispatch } from "react-redux";
import store from "./store/store";
import MapPage from "./pages/MapPage/MapPage";
import SearchModule from "./modules/SearchModule/SearchModule";
import HumanProfile from "./modules/HumanProfileModule/HumanProfile";
import Footer from "./components/Footer/Footer";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import NoSearchResults from "./pages/NoSearchResults/NoSearchResults";
import AdminPage from "./pages/AdminPage/AdminPage";
import AdminPanelModule from "./modules/AdminModule/AdminPanelModule/AdminPanelModule";
import AdminPageAuth from "./modules/AdminModule/AdminPageAuth/AdminPageAuth";
import PersonalArchive from "./pages/PersonalArchive/PersonalArchive";
import AdminSearchResult from "./modules/AdminModule/AdminSearchResultModule/AdminSearchResult";
import EditHumanModule from "./modules/EditHumanModule/EditHumanModule";
import AdminPageEditArchiveModule from "./modules/AdminModule/AdminPageEditArchiveModule/AdminPageEditArchiveModule";
import { apiGetCamps, apiOstarbaiters } from "./api/ApiRequest";
import { apiGetPeople } from "./store/basic/people.slice";
import { setCamps } from "./store/basic/camps.slice";

function App() {
  // const navigate = useNavigate();
  // const location = navigate()
  console.log("window.location.pathname", window.location.pathname);
  const dispacth = useDispatch();

  const funUpdatePeople = () => {
    //! записываем всех людей в редукс
    apiOstarbaiters().then((req) => {
      if (req?.status === 200) {
        dispacth(apiGetPeople({ ostarbaiters: req.data?.ostarbaiters }));
        console.log("req.data", req.data.ostarbaiters);
      }
    });
  };
  const funUpdateCamps = () => {
    //! записываем данные карты
    apiGetCamps().then((req) => {
      console.log("карта", req);
      if (req?.status === 200) {
        dispacth(setCamps({ camps: req.data?.camps }));
      }
    });
  };

  return (
    <BrowserRouter>
      <main className={styles.App}>
        <Header
          funUpdatePeople={funUpdatePeople}
          funUpdateCamps={funUpdateCamps}
        />
        <div className={styles.mainpage}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/SearchPage/*" element={<SearchPage />}>
              <Route path="SearchModule" element={<SearchModule />} />
              <Route path="HumanProfile" element={<HumanProfile />} />
            </Route>
            <Route path="/PersonalArchive" element={<PersonalArchive />} />
            <Route path="/MapPage" element={<MapPage />} />
            <Route path="/ErrorPage" element={<ErrorPage />} />
            <Route path="/NoSearchResults" element={<NoSearchResults />} />

            <Route path="/AdminPage/*" element={<AdminPage />}>
              <Route path="AdminPageAuth" element={<AdminPageAuth />} />
              <Route path="AdminPanelModule" element={<AdminPanelModule />} />
              <Route path="AdminSearchResult" element={<AdminSearchResult />} />
              <Route path="EditHumanModule" element={<EditHumanModule />} />
              <Route
                path="AdminPageEditArchiveModule"
                element={
                  <AdminPageEditArchiveModule
                    funUpdatePeople={funUpdatePeople}
                  />
                }
              />
            </Route>
          </Routes>
        </div>
        <Footer />
      </main>
    </BrowserRouter>
  );
}

export default App;
