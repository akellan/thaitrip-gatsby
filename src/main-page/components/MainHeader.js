import React from "react";
import { css } from "@emotion/core";
import { Link } from "@reach/router";
import { defaultLink, greenText } from "../../styles/common";
import { HalfStyle } from "../../components/HalfStyle";
import { Typography, Grid } from "@material-ui/core";

const headerContainer = css`
  height: 8rem;
`;

export const MainHeader = () => {
  return (
    <Typography component="header" variant="h2">
      <Grid
        css={headerContainer}
        container={true}
        justify="center"
        alignItems="center"
      >
        <Link css={defaultLink} to="/">
          <HalfStyle text="ThaiTrip" halfStyle={greenText} />
        </Link>
      </Grid>
    </Typography>
  );
};
