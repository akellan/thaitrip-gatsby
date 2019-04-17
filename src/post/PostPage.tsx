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
        allFile: {
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

    const fluidImages = useMemo(() => {
        try {
            return props.data.allFile.edges.map(
                edge => edge.node.childImageSharp.fluid
            );
        } catch (_) {
            return [];
        }
    }, [props.data.allFile]);

    const [image, setCurrentByIndex, previousImage, nextImage] = useNavigator(
        fluidImages
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

        allFile(
            filter: {
                extension: { regex: "/(jpg|jpeg)/i" }
                relativeDirectory: { eq: $slug }
            }
        ) {
            edges {
                node {
                    childImageSharp {
                        fluid(srcSetBreakpoints: [1200], toFormat: WEBP) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
    }
`;
