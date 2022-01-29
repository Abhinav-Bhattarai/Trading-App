import React from "react";
import "./popup.scss";

export interface POPUP_INTERFACE {
  className: string;
}

const PopupContainer: React.FC<{ className: string }> = ({
  children,
  className,
}) => {
  return (
    <main className="popup-container" id={className}>
      {children}
    </main>
  );
};

interface PopupHeaderProps {
  name: "login" | "signup";
  ClosePopup: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export const PopupHeader: React.FC<PopupHeaderProps> = (props) => {
  const { name } = props;
  let new_name = ''
  name === 'login' ? new_name = 'log in' : new_name = 'sign up'
  return (
    <header id="popup-header">
      <div id="popup-header-name"> {new_name + ' to your account'} </div>
    </header>
  );
};

export const PopupRouterContainer: React.FC<{
  popupName: "login" | "signup";
  ChangePopupType: () => void;
}> = (props) => {
  const { popupName, ChangePopupType } = props;
  return (
    <main id="popup-routers-container">
      <div>
        {popupName === "login"
          ? "Don't have an account ?"
          : "Already have an account ?"}
      </div>
      <div id='router' onClick={ChangePopupType}>
        {popupName === "login"
          ? " Create your account"
          : " Login to your account"}
      </div>
    </main>
  );
};

export const Popup: React.FC<POPUP_INTERFACE> = (props) => {
  const { className, children } = props;
  return <PopupContainer className={className}>{children}</PopupContainer>;
};
