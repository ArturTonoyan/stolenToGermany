import styles from "./styles/App.module.scss";
import {
  Routes,
  Route,
  useLocation,
  BrowserRouter,
  useNavigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import SearchPage from "./pages/SearchPage/SearchPage";
import { useDispatch, useSelector } from "react-redux";
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
import {
  apiGetPeople,
  setCount,
  setIsLoading,
  setLimitPlus,
} from "./store/basic/people.slice";
import { setCamps } from "./store/basic/camps.slice";
import { useEffect, useState } from "react";
import HeaderAdmin from "./components/HeaderAdmin/HeaderAdmin";
import Logo from "./components/Logo/Logo";
import LegalInformation from "./pages/LegalInformation/LegalInformation";
import DataContext from "./context";

function App() {
  sessionStorage.setItem("access_token", "efee");

  const [autorization, setAutorization] = useState<string>(
    sessionStorage.getItem("access_token") || ""
  );
  const navigate = useNavigate();
  const [isLoad, setIsLoad] = useState<boolean>(false);

  useEffect(() => {
    if (location.pathname === "/AdminPage/AdminPageAuth" && autorization) {
      navigate("/AdminPage/AdminPanelModule");
    }
  }, [autorization]);

  const [length, setLength] = useState(1);

  const location = useLocation();
  const dispacth = useDispatch();

  const funUpdatePeople = (start: number, end: number) => {
    //! записываем всех людей в редукс
    if (length > 0) {
      setIsLoad(true);
      apiOstarbaiters({
        param: "",
        start: start,
        end: end,
      })
        .then((req) => {
          if (req?.status === 200) {
            dispacth(apiGetPeople({ ostarbaiters: req.data?.ostarbaiters }));
            setLength(req.data?.ostarbaiters.length);
          }
        })
        .finally(() => {
          setIsLoad(false);
        });
    }
  };

  function funUpdatePeop(
    param: string,
    start: number,
    end: number,
    count: number
  ) {
    if (start < count) {
      apiOstarbaiters({
        param: param,
        start: start,
        end: end,
      })
        .then((req) => {
          if (req?.status === 200) {
            dispacth(apiGetPeople({ ostarbaiters: req.data?.ostarbaiters }));
            dispacth(setIsLoading({ isLoading: false }));
            dispacth(setLimitPlus());
            dispacth(setCount({ count: req.data?.count }));
          }
        })
        .finally(() => {
          dispacth(setIsLoading({ isLoading: false }));
        });
    } else {
      dispacth(setIsLoading({ isLoading: false }));
    }
  }

  const funUpdateCamps = () => {
    //! записываем данные карты
    apiGetCamps().then((req) => {
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
  const REACT_APP_API_URL = "https://ostarbaiters.dev.rdcenter.ru/api";
  const context = { REACT_APP_API_URL };

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
            <DataContext.Provider value={context}>
              <Routes>
                <Route
                  path="/"
                  element={<HomePage funUpdatePeop={funUpdatePeop} />}
                />
                <Route path="/SearchPage/*" element={<SearchPage />}>
                  <Route
                    path="SearchModule"
                    element={
                      <SearchModule
                        // funUpdatePeople={funUpdatePeople}
                        isLoad={isLoad}
                        setIsLoad={setIsLoad}
                        funUpdatePeop={funUpdatePeop}
                      />
                    }
                  />
                  <Route
                    path="HumanProfile"
                    element={<HumanProfile loc={location.pathname} />}
                  />
                </Route>
                <Route path="/PersonalArchive" element={<PersonalArchive />} />
                <Route path="/MapPage" element={<MapPage />} />
                <Route path="/ErrorPage" element={<ErrorPage />} />
                <Route path="/NoSearchResults" element={<NoSearchResults />} />

                <Route path="/AdminPage/*" element={<AdminPage />}>
                  <Route
                    path="AdminPageAuth"
                    element={
                      <AdminPageAuth setAutorization={setAutorization} />
                    }
                  />

                  <Route
                    path="AdminPanelModule"
                    element={
                      autorization ? (
                        <AdminPanelModule setAutorization={setAutorization} />
                      ) : (
                        <AdminPageAuth setAutorization={setAutorization} />
                      )
                    }
                  />
                  <Route
                    path="AdminSearchResult"
                    element={
                      autorization ? (
                        <AdminSearchResult
                          isLoad={isLoad}
                          setIsLoad={setIsLoad}
                          funUpdatePeop={funUpdatePeop}
                          setAutorization={setAutorization}
                        />
                      ) : (
                        <AdminPageAuth setAutorization={setAutorization} />
                      )
                    }
                  />
                  <Route
                    path="EditHumanModule"
                    element={
                      autorization ? (
                        <EditHumanModule setAutorization={setAutorization} />
                      ) : (
                        <AdminPageAuth setAutorization={setAutorization} />
                      )
                    }
                  />
                  <Route path="PersonalArchive" element={<PersonalArchive />} />
                  <Route
                    path="HumanProfile"
                    element={<HumanProfile loc={location.pathname} />}
                  />

                  <Route
                    path="AdminPageEditArchiveModule"
                    element={
                      autorization ? (
                        <AdminPageEditArchiveModule
                          funUpdatePeople={funUpdatePeople}
                          setAutorization={setAutorization}
                        />
                      ) : (
                        <AdminPageAuth setAutorization={setAutorization} />
                      )
                    }
                  />
                </Route>
                <Route path="*" element={<ErrorPage />} />
                <Route path="LegalInformation" element={<LegalInformation />} />
              </Routes>
            </DataContext.Provider>
          </div>
          <Footer />
        </main>
      )}
    </>
  );
}

export default App;
