import React, { useState, useCallback, KeyboardEvent, Fragment } from "react";
import { Layout } from "../components";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { Grid, Typography, withStyles, Modal } from "@material-ui/core";
import { HalfStyle } from "../components/HalfStyle";
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import withRoot from "../styles/withRoot";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const navigationOverlay = {
  position: "absolute",
  top: 0,
  height: "100%",
  width: "50%"
};

const style = (theme: ThemeOptions) => ({
  fullScreenImageContainer: {
    position: "relative",
    height: "100%"
  },
  // largeImageAppear: {
  //   opacity: 0
  // },
  // largeImageAppearActive: {
  //   opacity: 1,
  //   transition: "opacity 200ms"
  // },
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
  largeImage: {
    // bottom: 0
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
  // appearImage: {
  //   animation: "switch-image 2s",
  //   transition: "all 2s"
  // },
  // "@keyframes switch-image": {
  //   from: {
  //     opacity: "0"
  //   },
  //   to: {
  //     opacity: "1"
  //   }
  // },
  modalDialog: {
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center"
  },
  leftSide: {
    ...navigationOverlay,
    left: 0
  },
  rightSide: {
    ...navigationOverlay,
    right: 0
  }
});

interface BlogPostProps {
  data: {
    allFile: {
      edges: any[];
    };
    markdownRemark: any;
  };
  classes: any;
}

function BlogPost(props: BlogPostProps) {
  const post = props.data.markdownRemark;
  const images = props.data.allFile;
  const { classes } = props;
  const { title, date } = post.frontmatter;

  const [imageOpen, setImageOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [transImage, setTransImage] = useState([]);

  const openDialog = (image: number) => {
    setCurrentImage(image);
    setImageOpen(true);
    setTransImage([image]);
  };

  const closeDialog = useCallback(() => {
    setImageOpen(false);
  }, []);

  const nextImage = useCallback(() => {
    setCurrentImage(image => {
      const nextCurrent = image === images.edges.length - 1 ? 0 : image + 1;
      setTransImage([nextCurrent]);
      return nextCurrent;
    });
  }, []);

  const previousImage = useCallback(() => {
    setCurrentImage(image => {
      const nextCurrent = image === 0 ? images.edges.length - 1 : image - 1;
      setTransImage([nextCurrent]);
      return nextCurrent;
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
      closeDialog();
    }
  }, []);

  return (
    <Layout>
      <Grid container={true} justify="center" direction="row">
        <Grid item={true} xs={10}>
          <Typography variant="h3">
            <HalfStyle text={title} />
          </Typography>
          <Typography variant="h6">
            <HalfStyle text={date} />
          </Typography>
          <Typography
            dangerouslySetInnerHTML={{ __html: post.html }}
            variant="body1"
          />
          <Grid container={true} justify="center" spacing={8} direction="row">
            {images &&
              images.edges.map(({ node }, index) => (
                <Grid
                  item={true}
                  key={index}
                  xs={6}
                  onClick={useCallback(() => openDialog(index), [])}
                >
                  <Img fluid={node.childImageSharp.fluid} />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
      <Modal
        open={imageOpen}
        onClose={closeDialog}
        className={classes.modalDialog}
        onKeyDown={handleKeyboard}
      >
        <div className={classes.fullScreenImageContainer}>
          <TransitionGroup
            className={classes.transitionGroup}
            onClick={useCallback(e => {
              if (e.currentTarget === e.target) closeDialog();
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
                <div className={classes.largeImage}>
                  <Img fluid={images.edges[image].node.childImageSharp.fluid} />
                  <div onClick={previousImage} className={classes.leftSide} />
                  <div onClick={nextImage} className={classes.rightSide} />
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </Modal>
    </Layout>
  );
}

export default withRoot(withStyles(style)(BlogPost));

export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(frontmatter: { post_name: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
      }
    }

    allFile(
      filter: {
        extension: { regex: "/(jpg|jpeg)/i" }
        relativeDirectory: { eq: $slug }
      }
    ) {
      edges {
        node {
          childImageSharp {
            fluid(srcSetBreakpoints: [1200], toFormat: WEBP) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
