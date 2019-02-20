import React from "react";
import { css } from "@emotion/core";
import { Link } from "@reach/router";
import { defaultLink, greenText } from "../../styles/common";
import { HalfStyle } from "../../components/HalfStyle";

const siteTitle = css`
  font-size: 70px;
`;

const headerContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8rem;
`;

export const MainHeader = () => {
  return (
    <header css={siteTitle}>
      <div css={headerContainer}>
        <Link css={defaultLink} to="/">
          <HalfStyle text="ThaiTrip" halfStyle={greenText} />
        </Link>
      </div>
    </header>
  );
};
