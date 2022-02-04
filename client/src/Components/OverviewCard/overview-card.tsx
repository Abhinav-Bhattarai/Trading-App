import React from "react";
import "./overview-card.scss";

export interface OverViewProps {
  name: string;
  lastPrice: string;
  change: string;
  markets?: Array<number>;
}

export const FlexElements: React.FC<{ flex: number; content: string }> = (props) => {
  const { flex, content } = props;
  return (
    <div id="overview-card-flex-element" style={{ flex }}>
      {content}
    </div>
  );
};

const OverViewCard: React.FC<{}> = ({ children }) => {
  return (
    <React.Fragment>
      <main id="overview-card-container">{children}</main>
    </React.Fragment>
  );
};

export default OverViewCard;
