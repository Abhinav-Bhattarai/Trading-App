import { useQuery } from "@apollo/client";
import React, { useMemo, useState } from "react";
import { FetchCryptoData } from "../../GraphQL/grpahql";
import OverViewCard from "../OverviewCard/overview-card";
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
    <header id="latest-data-header">
      <div id="header-title"> Hot Picks </div>
    </header>
  );
};

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
      <main id="latest-data-section">{children}</main>
    </React.Fragment>
  );
};

export interface CryptoDataInterface {
  Name: string;
  PreviousClosePrice: string;
  Open: string;
  Close: string;
  Volume: string;
  Current: string;
  Logo: string;
}

const PricesPage = () => {
  const [cryptoData, setCryptoData] = useState<null | Array<CryptoDataInterface>>(null);
  useQuery(FetchCryptoData, {
    onCompleted: (data: Array<CryptoDataInterface>) => {
      if (data) {
        setCryptoData(data);
      }
    },
  });

  const cryptoDataJSX = useMemo(() => {
    if (cryptoData) {
      const mapper = cryptoData.map((data) => {
        return (
          <OverViewCard data={data}/>
        )
      });
      return mapper;
    }
    return null;
  }, [cryptoData]);

  return (
    <React.Fragment>
      <PricesPageContainer>
        <MarketDataSection>
          <MarketDataHeader />
          { cryptoDataJSX }
        </MarketDataSection>
        <LatestDataSection>
          <LatestDataHeader />
        </LatestDataSection>
      </PricesPageContainer>
    </React.Fragment>
  );
};

export default PricesPage;
