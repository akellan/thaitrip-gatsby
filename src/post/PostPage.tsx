import React, { useState, useCallback, useMemo } from "react";
import { Layout } from "../components";
import { Grid, Typography } from "@material-ui/core";
import { HalfStyle } from "../components/HalfStyle";
import withRoot from "../styles/withRoot";
import { graphql } from "gatsby";
import ImageModal from "../image-modal/ImageModal";
import { PostImage } from "./PostImage";
import useNavigator from "./useNavigator";

interface BlogPostProps {
    data: {
        smallImages: {
            edges: any[];
        };
        largeImages: {
            edges: any[];
        };
        markdownRemark: any;
    };
    classes: any;
}

function PostPage(props: BlogPostProps) {
    const post = props.data.markdownRemark;
    const { title, date } = post.frontmatter;

    const [imageModalOpen, setImageModalOpen] = useState(false);

    const imagesGet = function(props: BlogPostProps, alias: string) {
        try {
            return props.data[alias].edges.map(
                edge => edge.node.childImageSharp.fluid
            );
        } catch (_) {
            return [];
        }
    };

    const fluidImages = useMemo(() => {
        return imagesGet(props, "smallImages");
    }, [props.data.smallImages]);

    const largeImages = useMemo(() => {
        return imagesGet(props, "largeImages");
    }, [props.data.largeImages]);

    const [image, setCurrentByIndex, previousImage, nextImage] = useNavigator(
        largeImages
    );

    const openDialog = useCallback((imageIndex: number) => {
        setImageModalOpen(true);
        setCurrentByIndex(imageIndex);
    }, []);

    const closeDialog = useCallback(() => {
        setImageModalOpen(false);
    }, []);

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
                    <Grid
                        container={true}
                        justify="center"
                        spacing={8}
                        direction="row"
                    >
                        {fluidImages.map((fluidImage, index) => (
                            <PostImage
                                key={index}
                                imageIndex={index}
                                onClick={openDialog}
                                fluidImage={fluidImage}
                            />
                        ))}
                    </Grid>
                </Grid>
            </Grid>
            <ImageModal
                open={imageModalOpen}
                onClose={closeDialog}
                fluidImage={image}
                onNext={nextImage}
                onPrevious={previousImage}
            />
        </Layout>
    );
}

export default withRoot(PostPage);

export const query = graphql`
    query PostQuery($slug: String!) {
        markdownRemark(frontmatter: { post_name: { eq: $slug } }) {
            html
            frontmatter {
                title
                date
            }
        }

        smallImages: allFile(
            filter: {
                extension: { regex: "/(jpg|jpeg)/i" }
                relativeDirectory: { eq: $slug }
            }
        ) {
            edges {
                node {
                    childImageSharp {
                        fluid(maxWidth: 300) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }

        largeImages: allFile(
            filter: {
                extension: { regex: "/(jpg|jpeg)/i" }
                relativeDirectory: { eq: $slug }
            }
        ) {
            edges {
                node {
                    childImageSharp {
                        fluid {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
    }
`;
