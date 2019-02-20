import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/layout";

const IndexPage = props => {
  const postList = props.data.allMarkdownRemark;
  return (
    <Layout>
      {postList.edges.map(({ node }, i) => (
        <div key={node.id} className="post-list">
          <Link to={node.fields.slug} className="link">
            <h1>{node.frontmatter.title}</h1>
          </Link>
          <span>{node.frontmatter.date}</span>
          <Img fixed={node.frontmatter.title_image.childImageSharp.fixed} />
          <p>{node.excerpt}</p>
        </div>
      ))}
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
