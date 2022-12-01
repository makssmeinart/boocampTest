import styled from "styled-components/macro";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return <ContentWrapper>{children}</ContentWrapper>;
};

export default Layout;

const ContentWrapper = styled("div")`
  padding: 5rem 15rem;
  min-height: calc(100vh - 80px);

  h1 {
    margin: 2rem 0 0;
  }

  @media (max-width: 1366px) {
    padding: 3.4375rem 10rem 5rem;
  }

  @media (max-width: 920px) {
    padding: 3.4375rem 3rem;
  }

  @media (max-width: 414px) {
    padding: 3.4375rem 1.5rem 1.5rem;
  }

  @media (max-width: 360px) {
    padding: 3.4375rem 0.5rem 0.5rem;
  }
`;
