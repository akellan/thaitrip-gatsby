import React from "react";
import { createStyles, withStyles, Grid, Theme } from "@material-ui/core";
import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles";
import SvgIcon from "@material-ui/core/SvgIcon";

const sideClickPane: CSSProperties = {
    position: "absolute",
    top: "50%",
    fontSize: "4rem",
    cursor: "pointer"
};

const styles = (theme: Theme) =>
    createStyles({
        leftSide: {
            ...sideClickPane,
            left: "2rem",
            transform: "translateY(-50%) rotate(-90deg) "
        },
        rightSide: {
            ...sideClickPane,
            right: "2rem",
            transform: "translateY(-50%) rotate(90deg) "
        },
        arrowIcon: {
            fill: theme.palette.text.secondary,
            opacity: 0.7
        }
    });

export enum NextImageButton {
    Left,
    Right
}

interface NextImageOverlayProps extends WithStyles<typeof styles> {
    onClick: () => void;
    type: NextImageButton;
}

function NextImageOverlay({
    classes: { rightSide, leftSide, arrowIcon },
    onClick,
    type
}: NextImageOverlayProps) {
    const sideClassName = type === NextImageButton.Left ? leftSide : rightSide;
    return (
        <Grid onClick={onClick} className={sideClassName}>
            <SvgIcon fontSize="inherit">
                <path
                    className={arrowIcon}
                    d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"
                />
            </SvgIcon>
        </Grid>
    );
}

export default withStyles(styles)(NextImageOverlay);
