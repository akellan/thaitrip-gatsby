import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";

const IndexPage = props => {
  const postList = props.data.allMarkdownRemark;
  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      {postList.edges.map(({ node }, i) => (
        <div key={node.id} className="post-list">
          <Link to={node.fields.slug} className="link">
            <h1>{node.frontmatter.title}</h1>
          </Link>
          <span>{node.frontmatter.date}</span>
          <Image
            relativePath={`${node.fields.slug}images/${
              node.frontmatter.title_image
            }`}
          />
          <img
            src={`${node.fields.slug}${node.frontmatter.title_image}`}
            alt={node.frontmatter.title}
          />
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
            title_image
          }
        }
      }
    }
  }
`;
