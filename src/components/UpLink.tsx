import React, { useEffect, useState, useCallback } from "react";
import { createStyles, WithStyles, withStyles, Theme } from "@material-ui/core";
import { getScrollTop, setScrollTop } from "./useScrollTop";
import Icon from "@material-ui/core/SvgIcon";

const styles = (theme: Theme) =>
    createStyles({
        upLinkClass: {
            position: "fixed",
            bottom: "5%",
            right: "3%",
            display: "none",
            cursor: "pointer",
            backgroundColor: theme.palette.text.secondary,
            fontSize: "3rem",
            height: "3rem",
            width: "3rem",
            borderRadius: "50%"
        }
    });

interface UpLinkProps extends WithStyles<typeof styles> {}

export function UpLink({ classes }: UpLinkProps) {
    const [display, setDisplay] = useState(false);

    const scrollToTop = useCallback(() => {
        const scrollStep = 200;
        const scrollAnimation = () => {
            if (getScrollTop() > 0) {
                if (getScrollTop() < scrollStep) {
                    setScrollTop(0);
                } else {
                    setScrollTop(getScrollTop() - scrollStep);
                    requestAnimationFrame(scrollAnimation);
                }
            }
        };
        requestAnimationFrame(scrollAnimation);
    }, []);

    useEffect(() => {
        function handleScroll() {
            setDisplay(getScrollTop() > 20);
        }

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const style = {
        display: display ? "inline-block" : "none"
    };

    return (
        <div
            style={style}
            onClick={scrollToTop}
            className={classes.upLinkClass}
        >
            <Icon fontSize="inherit">
                <path
                    fill="#fff"
                    d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"
                />
            </Icon>
        </div>
    );
}

export default withStyles(styles)(UpLink);
