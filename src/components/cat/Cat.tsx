import styled from "styled-components/macro";
import { Cat as CatType } from "common/commonTypes";
import { LazyLoadImage } from "react-lazy-load-image-component";
import placeholder from "assets/images/placeholder/placeholder.png";
import React from "react";

type Props = {
  cat: CatType;
};

const Cat = React.memo(({ cat }: Props) => {
  const { url } = cat;

  return (
    <CatItem>
      <LazyLoadImage
        effect={"blur"}
        alt={"Cat image"}
        src={url} // use normal <img> attributes as props
        width={"100%"}
        height={"100%"}
        placeholderSrc={placeholder}
      />
    </CatItem>
  );
});

export default Cat;

const CatItem = styled("li")`
  width: 100%;
  height: 100%;
`;
