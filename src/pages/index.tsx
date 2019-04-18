import React from "react";
import { graphql } from "gatsby";
import { Layout } from "../components";
import { BlogListItem } from "../main-page/components/BlogListItem";
import { Grid } from "@material-ui/core";
import withRoot from "../styles/withRoot";

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
                            frontmatter: {
                                title,
                                date,
                                title_image,
                                images,
                                post_name
                            },
                            excerpt,
                            id
                        }
                    }) => (
                        <BlogListItem
                            key={id}
                            title={title}
                            date={date}
                            slug={post_name}
                            image={title_image}
                            excerpt={excerpt}
                            images={images}
                        />
                    )
                )}
            </Grid>
        </Layout>
    );
};

export default withRoot(IndexPage);

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
                        date
                        title
                        post_name
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
