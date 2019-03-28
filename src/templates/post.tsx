import React, { useState, useCallback, KeyboardEvent } from "react";
import { Layout } from "../components";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { Grid, Typography, withStyles, Modal } from "@material-ui/core";
import { HalfStyle } from "../components/HalfStyle";
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import withRoot from "../styles/withRoot";

const navigationOverlay = {
  position: "absolute",
  top: 0,
  height: "100%",
  width: "50%"
};

const style = (theme: ThemeOptions) => ({
  fullScreenImageContainer: {
    width: "75vw",
    position: "relative"
  },
  modalDialog: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
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
  const [currentImage, setCurrentImage] = useState<number>(null);

  const openDialog = (image: number) => {
    setCurrentImage(image);
    setImageOpen(true);
  };

  const closeDialog = useCallback(() => {
    setImageOpen(false);
  }, []);

  const nextImage = useCallback(() => {
    setCurrentImage(image =>
      image === images.edges.length - 1 ? 0 : image + 1
    );
  }, []);

  const previousImage = useCallback(() => {
    setCurrentImage(image =>
      image === 0 ? images.edges.length - 1 : image - 1
    );
  }, []);

  const handleKeyboard = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === 39) {
      nextImage();
    }
    if (e.keyCode === 37) {
      previousImage();
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
          {currentImage != null && (
            <Img
              fluid={images.edges[currentImage].node.childImageSharp.fluid}
            />
          )}
          <div onClick={previousImage} className={classes.leftSide} />
          <div onClick={nextImage} className={classes.rightSide} />
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
