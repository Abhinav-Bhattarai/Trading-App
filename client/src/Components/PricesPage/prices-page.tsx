import React from "react";
import "./prices-page.scss";

const PricesPageContainer: React.FC<{}> = ({ children }) => {
  return <div id="price-page-container">{children}</div>;
};

const MarketDataHeader = () => {
  return (
    <React.Fragment>
      <header id="price-page-header">
        <div id="header-title"> Market Prices </div>
      </header>
    </React.Fragment>
  );
};

const LatestDataHeader = () => {
  return (
    <header id='latest-data-header'>
        <div id="header-title"> Hot Picks </div>
    </header>
  )
}

const MarketDataSection: React.FC<{}> = ({ children }) => {
  return (
    <React.Fragment>
      <main id="market-data-section">{children}</main>
    </React.Fragment>
  );
};

const LatestDataSection: React.FC<{}> = ({ children }) => {
  return (
    <React.Fragment>
      <main id='latest-data-section'>
        { children }
      </main>
    </React.Fragment>
  );
}

const PricesPage = () => {
  return (
    <React.Fragment>
      <PricesPageContainer>
        <MarketDataSection>
          <MarketDataHeader />
        </MarketDataSection>
        <LatestDataSection>
          <LatestDataHeader/>
        </LatestDataSection>
      </PricesPageContainer>
    </React.Fragment>
  );
};

export default PricesPage;
