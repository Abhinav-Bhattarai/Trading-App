import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingPage from "./Components/UI/loadingPage";

import LandingPageGuard from "./Guards/LandingPageGuard";
import MainPageGuard from "./Guards/MainPageGuard";
import useAuthenticationHook from "./Hooks/useAuthenticationHook";

export interface UserInfo {
  authToken: string;
  uid: string;
  UserName: string;
}

const AsyncLandingPage = React.lazy(() => {
  return import("./Container/landingPage");
});

const AsyncMainPage = React.lazy(() => {
  return import("./Container/mainPage");
});

function App() {

  const [userInfo, setuserInfo] = useState<null | UserInfo>(null);
  const { auth_status, ChangeAuthenticationStatus } = useAuthenticationHook();

  return (
    <React.Fragment>
      <LandingPageGuard authStatus={auth_status}>
        <Routes>
          <Route
            path="/"
            element={
              <React.Suspense fallback={<LoadingPage />}>
                <AsyncLandingPage authStatus={auth_status} />
              </React.Suspense>
            }
          />

          <Route
            path="*"
            element={
              <React.Suspense fallback={<LoadingPage />}>
                <AsyncLandingPage authStatus={auth_status} />
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
                <AsyncMainPage userInfo={userInfo} authStatus={auth_status} />
              </React.Suspense>
            }
          />

          <Route
            path="*"
            element={
              <React.Suspense fallback={<LoadingPage />}>
                <AsyncMainPage userInfo={userInfo} authStatus={auth_status} />
              </React.Suspense>
            }
          />
        </Routes>
      </MainPageGuard>
    </React.Fragment>
  );
}

export default App;