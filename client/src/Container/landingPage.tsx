import React, { useState } from "react";
import { Route, Routes } from "react-router";
import { Transition } from 'react-transition-group';
// import { Route, Routes } from "react-router-dom";
import HomePage from "../Components/HomePage/homepage";
import Navbar from "../Components/HomePage/Navbar/navbar";
import { FormContainer } from "../Components/LandingPage/Form/form";
import { Popup, PopupHeader } from "../Components/LandingPage/Popup/popup";
import BlurPage from "../Components/UI/blur";

const duration = 700;

const LandingPage: React.FC<{ authStatus: boolean | null }> = ({ authStatus }) => {
  const [login_phone, setLoginPhone] = useState<string>('');
  const [login_password, setLoginPassword] = useState<string>('');
  const [signup_phone, setSignupPhone] = useState<string>('');
  const [signup_password, setSignupPass] = useState<string>('');
  const [popupStatus, setPopupStatus] = useState<boolean | null>(null);
  const [popupName, setPopupName] = useState<'login' | 'signup'>('login');

  const ChangePopupStatus = (event: React.MouseEvent<HTMLDivElement>) => {
    setPopupStatus(!popupStatus);
    if (!popupStatus === false) {
      setTimeout(() => {
        setPopupStatus(null)
      }, duration)  
    }
  }

  const ChangePopupType = (to: 'signup' | 'login') => {
    setPopupName(to);
  }

  const SubmitForm = (event: React.FormEvent) => {
    event.preventDefault();
  }

  let PopupJSX = null;
  let BlurJSX = null;

  if (popupStatus !== null) {
    PopupJSX = (
      <Transition timeout={duration} in={popupStatus}>
        { (state) => {
          return (
            <Popup className={`popup-${state}`}>
              <PopupHeader name={ popupName } ClosePopup={ChangePopupStatus} />
              <FormContainer Submit={SubmitForm}>

              </FormContainer>
            </Popup>
          )
        } }
      </Transition>
    )
    BlurJSX = <BlurPage ClosePopup={ ChangePopupStatus }/>
  }

  return (
    <React.Fragment>
      <Navbar authStatus={ authStatus } OpenPopup={ ChangePopupStatus }/>
      { PopupJSX }
      { BlurJSX }
      <Routes>
        <Route path='home' element={<HomePage/>}/>
        <Route path='*' element={<HomePage/>}/>
      </Routes>
    </React.Fragment>
  );
};

export default LandingPage;