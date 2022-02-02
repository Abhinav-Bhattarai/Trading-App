import React from "react";
import "./prices-page.scss";

const PricesPageContainer: React.FC<{}> = ({ children }) => {
  return <div id="price-page-container">{children}</div>;
};

const PricesPage = () => {
  return (
    <React.Fragment>
      <PricesPageContainer></PricesPageContainer>
    </React.Fragment>
  );
};

export default PricesPage;
