import React from "react";
import { IconContext } from "react-icons";
import { BiUser } from "react-icons/bi";
import { FaReact } from "react-icons/fa";
import { AiFillCaretDown } from "react-icons/ai";
import { NavLink } from "react-router-dom";

import Logo from "../../../assets/logo.svg";
import "./navbar.scss";

const NavbarContainer: React.FC<{}> = ({ children }) => {
  return <main id="navbar-container">{children}</main>;
};

const IconContainer: React.FC<{ className: string }> = ({
  className,
  children,
}) => {
  return (
    <IconContext.Provider value={{ className }}>
      {children}
    </IconContext.Provider>
  );
};

const LogoContainer: React.FC<{ source: string }> = ({ source }) => {
  return (
    <div id="navbar-logo-container">
      {/* <img
        src={source}
        alt="logo"
        id="logo-container"
        height={"45px"}
        width={"45px"}
      /> */}
      <IconContainer className="logo">
        <FaReact />
      </IconContainer>
    </div>
  );
};

const MidNavigationContainer: React.FC<{}> = ({ children }) => {
  return <div id="mid-navbar-nav-container">{children}</div>;
};

const MidNavigator: React.FC<{ name: string }> = ({ name }) => {
  const new_name = name.replace(/ /g, "");
  return (
    <NavLink
      to={`${new_name}`}
      id="navigators"
      className={({ isActive }) =>
        isActive ? "navlink-active" : "navlink-inactive"
      }
    >
      {name}
    </NavLink>
  );
};

const UserNavigationContainer: React.FC<{}> = ({ children }) => {
  return <nav id="user-navigation-container">{children}</nav>;
};

interface NavbarProps {
  OpenPopup: (event: React.MouseEvent<HTMLDivElement>) => void;
  authStatus: boolean | null;
}

const Navbar: React.FC<NavbarProps> = ({ authStatus, OpenPopup }) => {
  return (
    <React.Fragment>
      <NavbarContainer>
        <LogoContainer source={Logo} />
        <MidNavigationContainer>
          <MidNavigator name="Home" />
          <MidNavigator name="Prices" />
          <MidNavigator name="About" />
          <MidNavigator name="Latest News" />
          <MidNavigator name="Support" />
        </MidNavigationContainer>
        <UserNavigationContainer>
          <main id="navbar-icon-container" onClick={OpenPopup}>
            <IconContainer className="user-nav-icon">
              <BiUser />
            </IconContainer>
            <div id="user-status-name">
              {" "}
              {authStatus === false ? "Login" : "new"}{" "}
            </div>
            <IconContainer className="dropdown-icon">
              <AiFillCaretDown />
            </IconContainer>
          </main>
        </UserNavigationContainer>
      </NavbarContainer>
    </React.Fragment>
  );
};

export default Navbar;
