import React, { FunctionComponent, Fragment } from "react";
import { Typography } from "@material-ui/core";

interface HalfStyleProps {
  text: string;
}

export const HalfStyle: FunctionComponent<HalfStyleProps> = ({ text }) => {
  if (!text) {
    return null;
  }
  const textParts = text.split(" ");
  let firstPart = null;
  let secondPart = null;
  if (textParts.length <= 1) {
    const middle = text.length / 2;
    firstPart = text.substr(0, middle);
    secondPart = text.substr(middle, text.length - 1);
  } else {
    const middle = Math.ceil(textParts.length / 2);
    firstPart = textParts.slice(0, middle).join(" ");
    firstPart += " ";
    secondPart = textParts.slice(middle).join(" ");
  }
  return (
    <Fragment>
      {firstPart}
      <Typography
        color="textSecondary"
        variant="inherit"
        component="span"
        inline={true}
      >
        {secondPart}
      </Typography>
    </Fragment>
  );
};
