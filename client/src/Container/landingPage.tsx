import React, { useState } from "react";
import { Route, Routes } from "react-router";
import { Transition } from "react-transition-group";
// import { Route, Routes } from "react-router-dom";
import HomePage from "../Components/HomePage/homepage";
import Navbar from "../Components/HomePage/Navbar/navbar";
import {
  FormContainer,
  FormInput,
  FormLabel,
} from "../Components/LandingPage/Form/form";
import { Popup, PopupHeader } from "../Components/LandingPage/Popup/popup";
import BlurPage from "../Components/UI/blur";

const duration = 700;

const LandingPage: React.FC<{ authStatus: boolean | null }> = ({
  authStatus,
}) => {
  const [login_phone, setLoginPhone] = useState<string>("");
  const [login_password, setLoginPassword] = useState<string>("");
  const [signup_phone, setSignupPhone] = useState<string>("");
  const [signup_password, setSignupPassword] = useState<string>("");
  const [signup_confirm, setSignupConfirm] = useState<string>("");
  const [popupStatus, setPopupStatus] = useState<boolean | null>(null);
  const [popupName, setPopupName] = useState<"login" | "signup">("login");

  const ChangePopupStatus = (event: React.MouseEvent<HTMLDivElement>) => {
    setPopupStatus(!popupStatus);
    if (!popupStatus === false) {
      setTimeout(() => {
        setPopupStatus(null);
      }, duration);
    }
  };

  const ChangePopupType = (to: "signup" | "login") => {
    setPopupName(to);
  };

  const ChangePhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    popupName === "login" ? setLoginPhone(value) : setSignupPhone(value);
  };

  const ChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    popupName === "login" ? setLoginPassword(value) : setSignupPassword(value);
  };

  const ChangeConfirm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSignupConfirm(value);
  };

  const SubmitForm = (event: React.FormEvent) => {
    event.preventDefault();
  };

  let PopupJSX = null;
  let BlurJSX = null;

  let FormTypeJSX = (
    <React.Fragment>
      <FormLabel labelName="Phone" name="login_phone" />
      <FormInput
        name="login_phone"
        value={login_phone}
        placeholder="Phone Number"
        ChangeValue={ChangePhoneNumber}
        type="text"
      />
      <FormLabel labelName="Password" name="login_password" />
      <FormInput
        name="login_password"
        value={login_password}
        placeholder="Password"
        ChangeValue={ChangePassword}
        type="password"
      />
    </React.Fragment>
  );

  if (popupName === "signup") {
    FormTypeJSX = (
      <React.Fragment>
        <FormLabel labelName="Phone" name="signup_phone" />
        <FormInput
          name="signup_phone"
          value={signup_phone}
          placeholder="Phone Number"
          ChangeValue={ChangePhoneNumber}
          type="text"
        />
        <FormLabel labelName="Password" name="signup_password" />
        <FormInput
          name="signup_password"
          value={signup_password}
          placeholder="Password"
          ChangeValue={ChangePassword}
          type="password"
        />

        <FormLabel labelName="Confirm" name="signup_confirm" />
        <FormInput
          name="signup_confirm"
          value={signup_confirm}
          placeholder="Confirm"
          ChangeValue={ChangeConfirm}
          type="password"
        />
      </React.Fragment>
    );
  }

  if (popupStatus !== null) {
    PopupJSX = (
      <Transition timeout={duration} in={popupStatus}>
        {(state) => {
          return (
            <Popup className={`popup-${state}`}>
              <PopupHeader name={popupName} ClosePopup={ChangePopupStatus} />
              <FormContainer Submit={SubmitForm}>
                { FormTypeJSX }
              </FormContainer>
            </Popup>
          );
        }}
      </Transition>
    );
    BlurJSX = <BlurPage ClosePopup={ChangePopupStatus} />;
  }

  return (
    <React.Fragment>
      <Navbar authStatus={authStatus} OpenPopup={ChangePopupStatus} />
      {PopupJSX}
      {BlurJSX}
      <Routes>
        <Route path="home" element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </React.Fragment>
  );
};

export default LandingPage;
