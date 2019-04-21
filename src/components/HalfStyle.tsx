import React, { FunctionComponent, Fragment, useMemo } from "react";
import { Typography } from "@material-ui/core";
import { divideText } from "../text/divideText";

interface HalfStyleProps {
    text: string;
}

export const HalfStyle: FunctionComponent<HalfStyleProps> = ({ text }) => {
    if (!text) {
        return null;
    }

    const [firstPart, secondPart] = useMemo(() => {
        return divideText(text);
    }, [text]);

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
