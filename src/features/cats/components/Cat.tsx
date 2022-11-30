import styled from "styled-components/macro";
import { Cat as CatType } from "common/commonTypes";

type Props = {
  cat: CatType;
};

const Cat = ({ cat }: Props) => {
  const { url } = cat;

  return (
    <CatItem>
      <img src={url} alt="Cats" />
    </CatItem>
  );
};

export default Cat;

const CatItem = styled("li")`
  width: 100%;
  height: 100%;

  img {
    height: 100%;
    width: 100%;
  }
`;
