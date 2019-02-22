import * as React from "react";
import Img from "gatsby-image";
import { HalfStyle } from "../../components/HalfStyle";
import { Typography, Grid, withStyles } from "@material-ui/core";
import { AppLink } from "../../components/AppLink";
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";

interface BlogListItemProps {
  title: string;
  date: string;
  slug: string;
  image: any;
  excerpt: string;
  classes: any;
}

const style = (theme: ThemeOptions) => ({
  articleLink: {
    transition: "color 0.3s",
    "&:hover": {
      color: theme.palette.text.secondary
    },

    "&:hover > div": {
      "box-shadow": "0px 5px 10px 1px rgba(0, 0, 0, 0.2)"
    }
  },
  imageShadow: {
    transition: "all 0.3s",
    margin: "0.5rem 0"
  },
  articleTitleImage: {
    border: "5px solid #fff",
    "box-shadow": "0px 0px 0px 1px rgba(0, 0, 0, 0.2)",
    margin: "0"
  }
});

const BlogListItemBase = ({
  title,
  date,
  slug,
  image,
  excerpt,
  classes
}: BlogListItemProps) => (
  <Grid item={true} xs={6} container={true} direction="column">
    <AppLink
      underline="none"
      variant="h3"
      color={"textPrimary" as any}
      to={slug}
      className={classes.articleLink}
    >
      <HalfStyle text={title} />
      <div className={classes.imageShadow}>
        <Img
          style={{ width: "100%", display: "block" }}
          className={classes.articleTitleImage}
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

export const BlogListItem = withStyles(style)(BlogListItemBase);
