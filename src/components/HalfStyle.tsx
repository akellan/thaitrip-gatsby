import React, { FunctionComponent, Fragment } from "react";
import { SerializedStyles } from "@emotion/css";

interface HalfStyleProps {
  text: string;
  halfStyle: SerializedStyles;
}

export const HalfStyle: FunctionComponent<HalfStyleProps> = ({
  text,
  halfStyle
}) => {
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
      <span css={halfStyle}>{secondPart}</span>
    </Fragment>
  );
};
