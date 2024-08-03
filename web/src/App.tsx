import styles from "./styles/App.module.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import SearchPage from "./pages/SearchPage/SearchPage";
import { Provider } from "react-redux";
import store from "./store/store";
import MapPage from "./pages/MapPage/MapPage";
import SearchModule from "./modules/SearchModule/SearchModule";
import HumanProfile from "./modules/HumanProfile/HumanProfile";

function App() {
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
              <Route path="/MapPage" element={<MapPage />} />
            </Routes>
          </div>
        </main>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
