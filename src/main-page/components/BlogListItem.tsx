import * as React from "react";
import { Link } from "@reach/router";
import Img from "gatsby-image";
import { css } from "@emotion/core";
import { defaultLink, articleTitle, greenText } from "../../styles/common";
import { HalfStyle } from "../../components/HalfStyle";

interface BlogListItemProps {
  title: string;
  date: string;
  slug: string;
  image: any;
  excerpt: string;
}

const blogItemContainer = css`
  width: 70vw;
`;

const dateBlock = css`
  float: left;
`;

const excerptContainer = css`
  ::after {
    clear: both;
  }
`;

export const BlogListItem = ({
  title,
  date,
  slug,
  image,
  excerpt
}: BlogListItemProps) => (
  <article css={blogItemContainer}>
    <Link to={slug} css={defaultLink}>
      <h1 css={articleTitle}>
        <HalfStyle text={title} halfStyle={greenText} />
      </h1>
      <Img fixed={image.childImageSharp.fixed} />
    </Link>
    <div css={excerptContainer}>
      <span css={dateBlock}>{date}</span>
      <p>{excerpt}</p>
    </div>
  </article>
);
