import React from "react";
import { Route, Routes } from "react-router-dom";

const LandingPage = () => {
  return (
    <React.Fragment>
      <Routes>
          <Route path='/login' element={<></>}/>
          <Route path='/signup' element={<></>}/>
          <Route path='/' element={<></>}/>
      </Routes>
    </React.Fragment>
  );
};

export default LandingPage;
