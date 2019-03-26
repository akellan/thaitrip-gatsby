import React, { useState, useCallback } from "react";
import { Layout } from "../components";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { Grid, Typography, withStyles, Modal } from "@material-ui/core";
import { HalfStyle } from "../components/HalfStyle";
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import withRoot from "../styles/withRoot";

const style = (theme: ThemeOptions) => ({
  fullScreenImageContainer: {
    width: "80vw"
  },
  modalDialog: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

function BlogPost(props) {
  const post = props.data.markdownRemark;
  const images = props.data.allFile;
  const { classes } = props;
  const { title, date } = post.frontmatter;

  const [imageOpen, setImageOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<any>(null);

  const openDialog = image => {
    setCurrentImage(image);
    setImageOpen(true);
  };

  const closeDialog = useCallback(() => {
    setImageOpen(false);
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
                  onClick={useCallback(() => openDialog(node), [])}
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
      >
        <div className={classes.fullScreenImageContainer}>
          {currentImage && <Img fluid={currentImage.childImageSharp.fluid} />}
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
