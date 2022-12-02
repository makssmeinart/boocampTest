import Sidebar from "components/sidebar/Sidebar";
import styled from "styled-components/macro";
import Layout from "components/layout/Layout";
import Cats from "pages/cats/Cats";

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
