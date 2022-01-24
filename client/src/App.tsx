import React from "react";
import { Routes, Route } from "react-router-dom";
import LoadingPage from "./Components/UI/loadingPage";

import LandingPageGuard from "./Guards/LandingPageGuard";
import MainPageGuard from "./Guards/MainPageGuard";
import useAuthenticationHook from "./Hooks/useAuthenticationHook";

const AsyncLandingPage = React.lazy(() => {
  return import("./Container/landingPage");
});

const AsyncMainPage = React.lazy(() => {
  return import("./Container/mainPage");
});

function App() {
  const { auth_status, ChangeAuthenticationStatus } = useAuthenticationHook();
  console.log(auth_status);
  return (
    <React.Fragment>
      <LandingPageGuard authStatus={auth_status}>
        <Routes>
          <Route
            path="/"
            element={
              <React.Suspense fallback={<LoadingPage />}>
                <AsyncLandingPage />
              </React.Suspense>
            }
          />

          <Route
            path="*"
            element={
              <React.Suspense fallback={<LoadingPage />}>
                <AsyncLandingPage />
              </React.Suspense>
            }
          />
        </Routes>
      </LandingPageGuard>

      <MainPageGuard authStatus={auth_status}>
        <Routes>
          <Route
            path="/"
            element={
              <React.Suspense fallback={<LoadingPage />}>
                <AsyncMainPage />
              </React.Suspense>
            }
          />

          <Route
            path="*"
            element={
              <React.Suspense fallback={<LoadingPage />}>
                <AsyncMainPage />
              </React.Suspense>
            }
          />
        </Routes>
      </MainPageGuard>
    </React.Fragment>
  );
}

export default App;