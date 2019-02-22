import * as React from "react";
import Img from "gatsby-image";
import { css } from "@emotion/core";
import { greenText } from "../../styles/common";
import { HalfStyle } from "../../components/HalfStyle";
import { Typography, Grid } from "@material-ui/core";
import { AppLink } from "../../components/AppLink";

interface BlogListItemProps {
  title: string;
  date: string;
  slug: string;
  image: any;
  excerpt: string;
}

const articleLink = css`
  transition: color 0.3s;
  :hover {
    ${greenText}
  }

  :hover > div {
    box-shadow: 0px 5px 10px 1px rgba(0, 0, 0, 0.2);
  }
`;

const imageShadow = css`
  transition: all 0.3s;
  margin: 0.5rem 0;
`;

const articleTitleImage = css`
  border: 5px solid #fff;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.2);
  margin: 0;
`;

export const BlogListItem = ({
  title,
  date,
  slug,
  image,
  excerpt
}: BlogListItemProps) => (
  <Grid item={true} xs={6} container={true} direction="column">
    <AppLink
      underline="none"
      variant="h3"
      color={"textPrimary" as any}
      to={slug}
      css={articleLink}
    >
      <HalfStyle text={title} halfStyle={greenText} />
      <div css={imageShadow}>
        <Img
          style={{ width: "100%" }}
          css={articleTitleImage}
          fixed={image.childImageSharp.fixed}
        />
      </div>
    </AppLink>
    <div>
      <Typography variant="h6">{date}</Typography>
      <Typography variant="body1" component="p">
        {excerpt}
      </Typography>
    </div>
  </Grid>
);
