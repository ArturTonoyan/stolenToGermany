import styles from "./styles/App.module.scss";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import SearchPage from "./pages/SearchPage/SearchPage";
import { useDispatch } from "react-redux";
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
import { useEffect, useState } from "react";
import HeaderAdmin from "./components/HeaderAdmin/HeaderAdmin";
import PersonalArchiveAdmin from "./pages/PersonalArchiveAdmin/PersonalArchiveAdmin";
import Logo from "./components/Logo/Logo";
import LegalInformation from "./pages/LegalInformation/LegalInformation";

function App() {
  const location = useLocation();
  const dispacth = useDispatch();

  useEffect(() => {
    console.log("current path", location.pathname);
  }, [location.pathname]);

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

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(
      navigator.userAgent
    );
    setIsMobile(isMobileDevice);
  }, []);

  return (
    <>
      {isMobile ? (
        <div className={styles.mobil}>
          <div className={styles.mobilLogo}>
            <Logo />
          </div>
          <div className={styles.logoText}>Пожалуйста, зайдите с ПК.</div>
        </div>
      ) : (
        <main className={styles.App}>
          {location.pathname.includes("/AdminPage") &&
          !location.pathname.includes("/AdminPageAuth") ? (
            <HeaderAdmin
              funUpdatePeople={funUpdatePeople}
              funUpdateCamps={funUpdateCamps}
            />
          ) : (
            <Header
              funUpdatePeople={funUpdatePeople}
              funUpdateCamps={funUpdateCamps}
            />
          )}

          <div className={styles.mainpage}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/SearchPage/*" element={<SearchPage />}>
                <Route path="SearchModule" element={<SearchModule />} />
                <Route
                  path="HumanProfile"
                  element={<HumanProfile loc={location.pathname} />}
                />
              </Route>
              <Route path="/PersonalArchive" element={<PersonalArchive />} />
              <Route path="/MapPage" element={<MapPage />} />
              <Route path="/ErrorPage" element={<ErrorPage />} />
              <Route path="/NoSearchResults" element={<NoSearchResults />} />

              <Route
                path="/AdminPage/*"
                element={<AdminPage loc={location.pathname} />}
              >
                <Route path="AdminPageAuth" element={<AdminPageAuth />} />
                <Route path="AdminPanelModule" element={<AdminPanelModule />} />
                <Route
                  path="AdminSearchResult"
                  element={<AdminSearchResult />}
                />
                <Route path="EditHumanModule" element={<EditHumanModule />} />
                <Route path="PersonalArchive" element={<PersonalArchive />} />
                <Route
                  path="HumanProfile"
                  element={<HumanProfile loc={location.pathname} />}
                />

                <Route
                  path="AdminPageEditArchiveModule"
                  element={
                    <AdminPageEditArchiveModule
                      funUpdatePeople={funUpdatePeople}
                    />
                  }
                />
              </Route>
              <Route path="*" element={<ErrorPage />} />
              <Route path="LegalInformation" element={<LegalInformation />} />
            </Routes>
          </div>
          <Footer />
        </main>
      )}
    </>
  );
}

export default App;
