import React, { useState } from "react";
import { Route, Routes } from "react-router";
import { Transition } from "react-transition-group";
// import { Route, Routes } from "react-router-dom";
import HomePage from "../Components/HomePage/homepage";
import Navbar from "../Components/Navbar/navbar";
import {
  FormButton,
  FormContainer,
  FormInput,
  FormLabel,
  OAuthButton,
} from "../Components/LandingPage/Form/form";
import {
  Popup,
  PopupHeader,
  PopupRouterContainer,
} from "../Components/LandingPage/Popup/popup";
import BlurPage from "../Components/UI/blur";
import PricesPage from "../Components/PricesPage/prices-page";
import { axios } from "../axios";

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

  const ChangePopupType = () => {
    popupName === "login" ? setPopupName("signup") : setPopupName("login");
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

  const LengthCheck = () => {
    if (popupName === "login") {
      if (login_phone.length > 9 && login_password.length > 7) {
        return true;
      }
      return false;
    } else {
      if (
        signup_password === signup_confirm &&
        signup_password.length > 7 &&
        signup_phone.length > 9
      ) {
        return true;
      }
      return false;
    }
  };

  const RegexCheck = () => {
    let password;
    popupName === "login"
      ? (password = login_password)
      : (password = signup_password);
    const number_regex = /[0-9]/;
    if (number_regex.exec(password) !== null) {
      return true;
    }
    return false;
  };

  const LoginFormSubmit = () => {
    if (LengthCheck()) {
      if (RegexCheck()) {
        let config;
        config = {
          PhoneNumber: login_phone,
          Password: login_password,
        };

        if (popupName === "signup") {
          config = {
            PhoneNumber: signup_phone,
            Password: signup_password,
            Confirm: signup_confirm,
          };
        }
        axios.post(`/${popupName}`, config);
      }
    }
  };

  const SignupFormSubmit = () => {};

  const SubmitForm = (event: React.FormEvent) => {
    event.preventDefault();
    if (popupName === "login") {
      LoginFormSubmit();
    } else {
    }
  };

  let PopupJSX = null;
  let BlurJSX = null;

  let FormTypeJSX = (
    <React.Fragment>
      <FormLabel labelName="Phone Number" name="login_phone" />
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
        <FormLabel labelName="Phone Number" name="signup_phone" />
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

        <FormLabel labelName="Confirm Password" name="signup_confirm" />
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
                {FormTypeJSX}
                <FormButton buttonName={popupName} />
              </FormContainer>
              {/* <OAuthButton buttonName={`${popupName} with Google`} />
              <OAuthButton buttonName={`${popupName} with Facebook`} /> */}
              <PopupRouterContainer
                popupName={popupName}
                ChangePopupType={ChangePopupType}
              />
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
        <Route path="prices" element={<PricesPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </React.Fragment>
  );
};

export default LandingPage;
