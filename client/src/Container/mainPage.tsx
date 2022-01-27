import React from "react";
import { UserInfo } from "../App";

interface PROPS {
  authStatus: boolean | null;
  userInfo: UserInfo | null;
}

const MainPage: React.FC<PROPS> = ({ authStatus, userInfo }) => {
  return (
    <React.Fragment>

    </React.Fragment>
  )
};

export default MainPage;