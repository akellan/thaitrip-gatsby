import React from "react";
import { Layout } from "../components";
import { graphql } from "gatsby";

export default function BlogPost(props) {
  const post = props.data.markdownRemark;
  const { title, date } = post.frontmatter;
  return (
    <Layout>
      <div>
        <h1>{title}</h1>
        <h2>{date}</h2>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  );
}

export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "D MMMM YYYY", locale: "ru-UA")
      }
    }
  }
`;
