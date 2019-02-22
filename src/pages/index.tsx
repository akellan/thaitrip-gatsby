import React, { Fragment } from "react";
import { graphql } from "gatsby";
import { Layout } from "../components";
import { BlogListItem } from "../main-page/components/BlogListItem";
import { Grid } from "@material-ui/core";

const IndexPage = props => {
  const postList = props.data.allMarkdownRemark;
  return (
    <Layout>
      <Grid
        container={true}
        spacing={40}
        alignItems="center"
        direction="column"
      >
        {postList.edges.map(
          ({
            node: {
              frontmatter: { title, date, title_image },
              excerpt,
              id,
              fields: { slug }
            }
          }) => (
            <BlogListItem
              key={id}
              title={title}
              date={date}
              slug={slug}
              image={title_image}
              excerpt={excerpt}
            />
          )
        )}
      </Grid>
    </Layout>
  );
};

export default IndexPage;

export const listQuery = graphql`
  query ListQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          fields {
            slug
          }
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "D MMMM YYYY", locale: "ru-UA")
            title
            title_image {
              childImageSharp {
                fixed {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`;
