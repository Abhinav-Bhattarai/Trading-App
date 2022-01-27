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
  return (
    <header id="popup-header">
      <div id='popup-header-name'> { name } </div>
    </header>
  );
};

export const Popup: React.FC<POPUP_INTERFACE> = (props) => {
  const { className, children } = props;
  return (
    <PopupContainer className={className}>
      { children }
    </PopupContainer>
  );
};
