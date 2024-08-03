import React from "react";
import styles from "./styles/App.module.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./components/Header/Header";
import SearchPage from "./pages/SearchPage/SearchPage";
import { Provider } from "react-redux";
import store from "./store/store";
import MapPage from "./pages/MapPage/MapPage";
import HumanProfilePage from "./pages/HumanProfilePage/HumanProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <main className={styles.App}>
          <Header />
          <div className={styles.mainpage}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/SearchPage" element={<SearchPage />} />
              <Route path="/HumanProfilePage" element={<HumanProfilePage />} />
              <Route path="/MapPage" element={<MapPage />} />
            </Routes>
          </div>
        </main>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
