import { withStyles, Modal, createStyles, Grid } from "@material-ui/core";
import React, { useCallback, KeyboardEvent } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles";
import GatsbyImage, { FluidObject } from "gatsby-image";
import NextImageOverlay, { NextImageButton } from "./NextImageOverlay";
import CloseIcon from "./CloseIcon";

const styles = createStyles({
    gatsbyImage: {
        width: "90vw",
        height: "90vh"
    },
    transitionGroup: {
        position: "relative",
        height: "100%"
    },
    transition: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    largeImageEnter: {
        opacity: 0
    },
    largeImageEnterActive: {
        opacity: 1,
        transition: "opacity 200ms"
    },
    largeImageExit: {
        opacity: 1
    },
    largeImageExitActive: {
        opacity: 0,
        transition: "opacity 500ms"
    }
});

interface ImageModalProps extends WithStyles<typeof styles> {
    open: boolean;
    fluidImage: FluidObject;
    onClose: () => void;
    onNext: () => void;
    onPrevious: () => void;
}

function ImageModal({
    open,
    onClose,
    classes,
    fluidImage,
    onNext,
    onPrevious
}: ImageModalProps) {
    if (!fluidImage) {
        return null;
    }

    const handleKeyboard = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
        switch (e.key) {
            case "ArrowRight":
                onNext();
                break;
            case "ArrowLeft":
                onPrevious();
                break;
            case "Escape":
                onClose();
                break;
        }
    }, []);

    return (
        <Modal open={open} onClose={onClose} onKeyDown={handleKeyboard}>
            <Grid className={classes.transitionGroup}>
                <TransitionGroup className={classes.transitionGroup}>
                    {[fluidImage].map(image => (
                        <CSSTransition
                            className={classes.transition}
                            key={image.src}
                            timeout={300}
                            classNames={{
                                enter: classes.largeImageEnter,
                                enterActive: classes.largeImageEnterActive,
                                exit: classes.largeImageExit,
                                exitActive: classes.largeImageExitActive
                            }}
                        >
                            <div>
                                <GatsbyImage
                                    imgStyle={{ objectFit: "contain" }}
                                    className={classes.gatsbyImage}
                                    fluid={image}
                                />
                            </div>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
                <NextImageOverlay
                    onClick={onPrevious}
                    type={NextImageButton.Left}
                />
                <NextImageOverlay
                    onClick={onNext}
                    type={NextImageButton.Right}
                />
                <CloseIcon onClick={onClose} />
            </Grid>
        </Modal>
    );
}

export default withStyles(styles)(ImageModal);
