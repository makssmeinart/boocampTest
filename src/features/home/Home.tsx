import Sidebar from "features/sidebar/Sidebar";
import styled from "styled-components/macro";
import Cats from "features/cats/Cats";

const Home = () => {
  return (
    <Container>
      <Sidebar />
      <ContentWrapper>
        <Cats />
      </ContentWrapper>
    </Container>
  );
};

export default Home;

const Container = styled("section")`
  height: 100%;
`;

const ContentWrapper = styled("div")`
  padding: 5rem 15rem;
  min-height: calc(100vh - 80px);

  @media (max-width: 1366px) {
    padding: 5rem 10rem;
  }

  @media (max-width: 920px) {
    padding: 3rem;
  }

  @media (max-width: 414px) {
    padding: 1rem 1.5rem;
  }

  @media (max-width: 360px) {
    padding: 0.5rem;
  }
`;
