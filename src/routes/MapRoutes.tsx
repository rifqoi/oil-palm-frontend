import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Logout from "../components/Auth/Logout";
import RequireAuth from "../components/Auth/RequireAuth";
import HistoryPredictions from "../components/Sidebar/HistoryPredictions";
import HistoryPredictionsID from "../components/Sidebar/HistoryPredictionsID";
import PredictedTrees from "../components/Sidebar/PredictedTrees";
import PredictionResult from "../components/Sidebar/PredictionResult";
import SidebarMain from "../components/Sidebar/SidebarMain";
import LoginScreen from "../pages/Login";
import MapPage from "../pages/MapPage";
import SignUpScreen from "../pages/SignUp";

const MapRoutes = () => {
  const [profileDropdownOpen, setProfileDropdownOpen] =
    useState<boolean>(false);

  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignUpScreen />} />
      <Route path="/logout" element={<Logout />} />
      <Route element={<RequireAuth />}>
        <Route element={<MapPage />}>
          <Route
            path="/"
            element={
              <>
                <SidebarMain
                  profileDropdownOpened={profileDropdownOpen}
                  setProfileDropDownOpened={setProfileDropdownOpen}
                />
              </>
            }
          />
          <Route
            path="/trees"
            element={
              <>
                <PredictedTrees />
                {/* <div className="grid grid-cols-1 xl:grid-cols-2 w-full h-auto"></div> */}
              </>
            }
          />
          <Route
            path="/predictions"
            element={
              <>
                <HistoryPredictions />
              </>
            }
          />
          <Route
            path="/predict"
            element={
              <>
                <PredictionResult />
              </>
            }
          />
          <Route
            path="/predictions/:id"
            element={
              <>
                <HistoryPredictionsID />
              </>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default MapRoutes;
