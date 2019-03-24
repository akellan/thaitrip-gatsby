import React from "react";
import { Layout } from "../components";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import { Grid, Typography } from "@material-ui/core";
import { HalfStyle } from "../components/HalfStyle";

export default function BlogPost(props) {
  const post = props.data.markdownRemark;
  const images = props.data.allFile;
  const { title, date } = post.frontmatter;
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
                <Grid item={true} key={index} xs={6}>
                  <Img fluid={node.childImageSharp.fluid} />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}

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
            fluid(srcSetBreakpoints: [1200]) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
