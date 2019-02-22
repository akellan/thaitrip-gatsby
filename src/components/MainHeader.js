import React from "react";
import { css } from "@emotion/core";
import { greenText } from "../styles/common";
import { HalfStyle } from "./HalfStyle";
import { Typography, Grid } from "@material-ui/core";
import { AppLink } from "./AppLink";

const headerContainer = css`
  height: 8rem;
`;

export const MainHeader = () => {
  return (
    <Typography component="header" variant="h1">
      <Grid
        css={headerContainer}
        container={true}
        justify="center"
        alignItems="center"
      >
        <AppLink underline="none" to="/">
          <HalfStyle text="ThaiTrip" halfStyle={greenText} />
        </AppLink>
      </Grid>
    </Typography>
  );
};
