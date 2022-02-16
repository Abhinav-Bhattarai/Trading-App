import React from "react";
import { CryptoDataInterface } from "../PricesPage/prices-page";
import "./overview-card.scss";

export const FlexElements: React.FC<{ flex: number; content: string }> = (props) => {
  const { flex, content } = props;
  return (
    <div id="overview-card-flex-element" style={{ flex }}>
      {content}
    </div>
  );
};

interface OverViewCardProps {
  data: CryptoDataInterface
}

const OverViewCard: React.FC<OverViewCardProps> = (props) => {
  const { children, data } = props;
  const { Name, Logo, Close, PreviousClosePrice, Open, Current, Volume } = data;
  return (
    <React.Fragment>
      <main id="overview-card-container">{children}</main>
    </React.Fragment>
  );
};

export default OverViewCard;
