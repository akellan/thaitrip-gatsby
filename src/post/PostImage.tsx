import React, { useCallback } from "react";
import { Grid } from "@material-ui/core";
import Image, { FluidObject } from "gatsby-image";

interface PostImageProps {
  imageIndex: number;
  fluidImage: FluidObject;
  onClick: (imageIndex: number) => void;
}

export function PostImage({ imageIndex, fluidImage, onClick }: PostImageProps) {
  return (
    <Grid
      item={true}
      xs={10}
      sm={6}
      md={4}
      lg={3}
      onClick={useCallback(() => onClick(imageIndex), [imageIndex])}
    >
      <Image fluid={fluidImage} />
    </Grid>
  );
}
