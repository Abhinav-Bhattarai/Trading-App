import React from "react";
import "./ui.scss";

const BlurPage: React.FC<{
  ClosePopup: (e: React.MouseEvent<HTMLDivElement>) => void;
}> = ({ ClosePopup }) => {
  return <div id="blur-page" onClick={ClosePopup}></div>;
};

export default BlurPage;
