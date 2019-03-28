import { withStyles, Modal } from "@material-ui/core";
import React, { useCallback, KeyboardEvent, useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
  CSSProperties,
  StyleRules,
  WithStyles
} from "@material-ui/core/styles/withStyles";
import GatsbyImage, { FluidObject } from "gatsby-image";

const sideClickPane: CSSProperties = {
  position: "absolute",
  top: 0,
  height: "100%",
  width: "50%"
};

const styles: StyleRules = {
  fullScreenImageContainer: {
    position: "relative",
    height: "100%"
  },
  transitionGroup: {
    position: "relative",
    height: "100%"
  },
  transaction: {
    position: "absolute",
    width: "75vw",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
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
};

interface ImageModalProps extends WithStyles<typeof styles> {
  open: boolean;
  onClose: () => void;
  imageIndex: number;
  fluidImages: ReadonlyArray<FluidObject>;
}

function ImageModal({
  open,
  onClose,
  classes,
  fluidImages,
  imageIndex = 0
}: ImageModalProps) {
  const [transImage, setTransImage] = useState([imageIndex]);
  const nextImage = useCallback(() => {
    setTransImage(([imageIndex]) => {
      return [imageIndex === fluidImages.length - 1 ? 0 : imageIndex + 1];
    });
  }, []);

  const previousImage = useCallback(() => {
    setTransImage(([imageIndex]) => {
      return [imageIndex === 0 ? fluidImages.length - 1 : imageIndex - 1];
    });
  }, []);
  const handleKeyboard = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === 39) {
      nextImage();
    }
    if (e.keyCode === 37) {
      previousImage();
    }
    if (e.keyCode === 27) {
      onClose();
    }
  }, []);
  return (
    <Modal
      open={open}
      onClose={onClose}
      className={classes.modalDialog}
      onKeyDown={handleKeyboard}
    >
      <div className={classes.fullScreenImageContainer}>
        <TransitionGroup
          className={classes.transitionGroup}
          onClick={useCallback(e => {
            if (e.currentTarget === e.target) onClose();
          }, [])}
        >
          {transImage.map(image => (
            <CSSTransition
              className={classes.transaction}
              key={image}
              timeout={300}
              classNames={{
                appear: classes.largeImageAppear,
                appearActive: classes.largeImageAppearActive,
                enter: classes.largeImageEnter,
                enterActive: classes.largeImageEnterActive,
                exit: classes.largeImageExit,
                exitActive: classes.largeImageExitActive
              }}
            >
              <div>
                <GatsbyImage fluid={fluidImages[image]} />
                <div onClick={previousImage} className={classes.leftSide} />
                <div onClick={nextImage} className={classes.rightSide} />
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </Modal>
  );
}

export default withStyles(styles)(ImageModal);
