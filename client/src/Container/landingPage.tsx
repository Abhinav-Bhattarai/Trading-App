import React from "react";
// import { Route, Routes } from "react-router-dom";
import HomePage from "../Components/HomePage/homepage";

const LandingPage = () => {
  return (
    <React.Fragment>
      <HomePage/>
      {/* <Routes>
          <Route path='/login' element={<></>}/>
          <Route path='/signup' element={<></>}/>
      </Routes> */}
    </React.Fragment>


  );
};

export default LandingPage;