import Sidebar from "features/sidebar/Sidebar";
import styled from "styled-components/macro";
import Layout from "common/components/layout/Layout";
import Cats from "features/cats/Cats";

const Home = () => {
  return (
    <Container>
      <Sidebar />
      <Layout>
        <Cats />
      </Layout>
    </Container>
  );
};

export default Home;

const Container = styled("section")`
  height: 100%;
`;
