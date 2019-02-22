import React from "react";
import { HalfStyle } from "./HalfStyle";
import { Grid, withStyles } from "@material-ui/core";
import { AppLink } from "./AppLink";

const styles = () => ({
  padding: {
    padding: `4rem 0`
  }
});

const MainHeaderBase = ({ classes }) => {
  return (
    <Grid
      container={true}
      className={classes.padding}
      justify="center"
      alignItems="center"
    >
      <AppLink
        color={"textPrimary" as any}
        variant="h1"
        underline="none"
        to="/"
      >
        <HalfStyle text="ThaiTrip" />
      </AppLink>
    </Grid>
  );
};

export const MainHeader = withStyles(styles)(MainHeaderBase);
