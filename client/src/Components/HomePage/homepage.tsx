import React from "react";
import "./homepage.scss";

const HomePageContainer: React.FC<{}> = ({ children }) => {
  return <div id="home-page-container"> { children } </div>;
};

const HomePage: React.FC<{}> = () => {
  return (
    <React.Fragment>
      <HomePageContainer></HomePageContainer>
    </React.Fragment>
  );
};

export default HomePage;
