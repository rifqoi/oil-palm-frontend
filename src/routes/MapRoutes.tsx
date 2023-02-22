import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import RequireAuth from "../components/Auth/RequireAuth";
import HistoryPredictions from "../components/Sidebar/HistoryPredictions";
import HistoryPredictionsID from "../components/Sidebar/HistoryPredictionsID";
import PredictedTrees from "../components/Sidebar/PredictedTrees";
import PredictionResult from "../components/Sidebar/PredictionResult";
import SidebarMain from "../components/Sidebar/SidebarMain";
import useToken from "../hooks/useToken";
import LoginScreen from "../pages/Login";
import MapPage from "../pages/MapPage";

const MapRoutes = () => {
  const [token, setToken] = useToken();
  const [profileDropdownOpen, setProfileDropdownOpen] =
    useState<boolean>(false);

  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route path="/" element={<MapPage />}>
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
      {token ? (
        <Route path="/login" element={<Navigate to="/" />} />
      ) : (
        <>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
};

export default MapRoutes;
