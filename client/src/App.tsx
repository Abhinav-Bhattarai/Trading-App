import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingPage from "./Components/UI/loadingPage";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import LandingPageGuard from "./Guards/LandingPageGuard";
import MainPageGuard from "./Guards/MainPageGuard";
import useAuthenticationHook from "./Hooks/useAuthenticationHook";

const AsyncLandingPage = React.lazy(() => {
  return import("./Container/landingPage");
});

const AsyncMainPage = React.lazy(() => {
  return import("./Container/mainPage");
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://localhost:8080",
});

function App() {
  const [userID, setuserID] = useState<null | string>(null);
  const { auth_status, ChangeAuthenticationStatus } = useAuthenticationHook({
    getUserID: (id: string) => setuserID(id)
  });

  return (
    <React.Fragment>
      <ApolloProvider client={client}>
        <LandingPageGuard authStatus={auth_status}>
          <Routes>
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
              path="*"
              element={
                <React.Suspense fallback={<LoadingPage />}>
                  <AsyncMainPage userInfo={userID} authStatus={auth_status} />
                </React.Suspense>
              }
            />
          </Routes>
        </MainPageGuard>
      </ApolloProvider>
    </React.Fragment>
  );
}

export default App;
