import {
    withStyles,
    Modal,
    createStyles,
    FormHelperText
} from "@material-ui/core";
import React, { useCallback, KeyboardEvent, useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { CSSProperties, WithStyles } from "@material-ui/core/styles/withStyles";
import GatsbyImage, { FluidObject } from "gatsby-image";

const sideClickPane: CSSProperties = {
    position: "absolute",
    top: 0,
    height: "100%",
    width: "50%"
};

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
    },
    leftSide: {
        ...sideClickPane,
        left: 0
    },
    rightSide: {
        ...sideClickPane,
        right: 0
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
            <TransitionGroup
                className={classes.transitionGroup}
                onClick={useCallback(e => {
                    if (e.currentTarget === e.target) onClose();
                }, [])}
            >
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
                            <div
                                onClick={onPrevious}
                                className={classes.leftSide}
                            />
                            <div
                                onClick={onNext}
                                className={classes.rightSide}
                            />
                        </div>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </Modal>
    );
}

export default withStyles(styles)(ImageModal);
