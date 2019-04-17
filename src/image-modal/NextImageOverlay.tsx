import React from "react";
import { createStyles, withStyles, Grid, Theme } from "@material-ui/core";
import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles";
import SvgIcon from "@material-ui/core/SvgIcon";

const sideClickPane: CSSProperties = {
    position: "absolute",
    top: "50%",
    fontSize: "4rem",
    cursor: "pointer",
    transition: "all 0.2s",
    opacity: 0.7,
    transform: "scale(1)",
    "&:active": {
        transform: "scale(0.9)",
        opacity: 1
    }
};

const styles = (theme: Theme) =>
    createStyles({
        leftSide: {
            ...sideClickPane,
            left: "2rem"
        },
        rightSide: {
            ...sideClickPane,
            right: "2rem"
        },
        arrowIcon: {
            fill: theme.palette.text.secondary
            // opacity: 0.7
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
                {type === NextImageButton.Left ? (
                    <path
                        className={arrowIcon}
                        d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"
                    />
                ) : (
                    <path
                        className={arrowIcon}
                        d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
                    />
                )}
            </SvgIcon>
        </Grid>
    );
}

export default withStyles(styles)(NextImageOverlay);
