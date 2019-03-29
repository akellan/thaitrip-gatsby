import React, { useEffect, useState, useCallback } from "react";
import { createStyles, WithStyles, withStyles, Theme } from "@material-ui/core";

const styles = (theme: Theme) =>
    createStyles({
        upLinkClass: {
            position: "fixed",
            bottom: "5%",
            right: "5%",
            display: "none",
            cursor: "pointer",
            border: `1px solid ${theme.palette.text.secondary}`,
            borderRadius: "100px"
        }
    });

interface UpLinkProps extends WithStyles<typeof styles> {}

export function UpLink({ classes }: UpLinkProps) {
    const [display, setDisplay] = useState(false);

    const scrollToTop = useCallback(() => {
        const scrollStep = 200;
        requestAnimationFrame(function scrollAnimation() {
            const scrollTop =
                document.body.scrollTop + document.documentElement.scrollTop;
            if (scrollTop > 0) {
                if (scrollTop < scrollStep) {
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                } else {
                    if (document.body.scrollTop >= scrollStep) {
                        document.body.scrollTop -= scrollStep;
                    }

                    if (document.documentElement.scrollTop >= scrollStep) {
                        document.documentElement.scrollTop -= scrollStep;
                    }
                    requestAnimationFrame(scrollAnimation);
                }
            }
        });
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (
                document.body.scrollTop > 20 ||
                document.documentElement.scrollTop > 20
            ) {
                setDisplay(true);
            } else {
                setDisplay(false);
            }
        });
    }, []);

    const style = {
        display: display ? "block" : "none"
    };

    return (
        <div
            style={style}
            onClick={scrollToTop}
            className={classes.upLinkClass}
        >
            UpLink
        </div>
    );
}

export default withStyles(styles)(UpLink);
