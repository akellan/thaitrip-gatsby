import React from "react";
import { Layout } from "../components";
import { graphql } from "gatsby";
import Img from "gatsby-image";

export default function BlogPost(props) {
  const post = props.data.markdownRemark;
  const images = props.data.allFile.edges;
  const { title, date } = post.frontmatter;
  return (
    <Layout>
      <div>
        <h1>{title}</h1>
        <h2>{date}</h2>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <div>
          {images.map(({ node }, index) => (
            <Img key={index} fixed={node.childImageSharp.fixed} />
          ))}
        </div>
      </div>
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
            fixed {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`;
