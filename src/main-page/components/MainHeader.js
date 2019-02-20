import React from "react";
import { css } from "@emotion/core";
import { Link } from "@reach/router";
import { defaultLink, greenText } from "../../styles/common";

const siteTitle = css`
  font-size: 70px;
`;

const headerContainer = css`
  display: flex;
  justify-content: center;
`;

export const MainHeader = () => {
  return (
    <header css={siteTitle}>
      <div css={headerContainer}>
        <Link css={defaultLink} to="/">
          Thai<span css={greenText}>Trip</span>
        </Link>
      </div>
    </header>
  );
};
