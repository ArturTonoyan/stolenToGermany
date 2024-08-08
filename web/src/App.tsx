import styles from "./styles/App.module.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import SearchPage from "./pages/SearchPage/SearchPage";
import { Provider } from "react-redux";
import store from "./store/store";
import MapPage from "./pages/MapPage/MapPage";
import SearchModule from "./modules/SearchModule/SearchModule";
import HumanProfile from "./modules/HumanProfileModule/HumanProfile";
import Footer from "./components/Footer/Footer";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import NoSearchResults from "./pages/NoSearchResults/NoSearchResults";
import AdminPage from "./pages/AdminPage/AdminPage";
import AdminPanelModule from "./modules/AdminPanelModule/AdminPanelModule";
import AdminPageAuth from "./modules/AdminPageAuth/AdminPageAuth";
import PersonalArchive from "./pages/PersonalArchive/PersonalArchive";
import AdminSearchResult from "./modules/AdminSearchResultModule/AdminSearchResult";
import EditHumanModule from "./modules/EditHumanModule/EditHumanModule";

function App() {
  // const navigate = useNavigate();
  // const location = navigate();

  return (
    <BrowserRouter>
      <Provider store={store}>
        <main className={styles.App}>
          <Header />
          <div className={styles.mainpage}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/SearchPage*" element={<SearchPage />}>
                <Route path="SearchModule" element={<SearchModule />} />
                <Route path="HumanProfile" element={<HumanProfile />} />
              </Route>
              <Route path="/PersonalArchive" element={<PersonalArchive />} />
              <Route path="/MapPage" element={<MapPage />} />
              <Route path="/ErrorPage" element={<ErrorPage />} />
              <Route path="/NoSearchResults" element={<NoSearchResults />} />

              <Route path="/AdminPage*" element={<AdminPage />}>
                <Route path="AdminPageAuth" element={<AdminPageAuth />} />
                <Route path="AdminPanelModule" element={<AdminPanelModule />} />
                <Route path="AdminSearchResult" element={<AdminSearchResult />} />
                <Route path="EditHumanModule" element={<EditHumanModule />} />
              </Route>
            </Routes>
          </div>
          <Footer />
        </main>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
