import {
    SvgIcon,
    Theme,
    createStyles,
    withStyles,
    WithStyles
} from "@material-ui/core";
import React from "react";

interface CloseIconProps extends WithStyles<typeof styles> {
    onClick: () => void;
}

const styles = (theme: Theme) =>
    createStyles({
        closeIcon: {
            fill: theme.palette.text.secondary,
            opacity: 0.7,
            position: "absolute",
            top: "2rem",
            right: "2rem",
            fontSize: "3rem",
            cursor: "pointer",
            transform: "scale(1)",
            transition: "all 0.2s",
            "&:active": {
                transform: "scale(0.9)",
                opacity: 1
            }
        }
    });

const CloseIcon = ({ onClick, classes: { closeIcon } }: CloseIconProps) => {
    return (
        <SvgIcon onClick={onClick} className={closeIcon}>
            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
        </SvgIcon>
    );
};

export default withStyles(styles)(CloseIcon);
