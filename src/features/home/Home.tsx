import Sidebar from "features/sidebar/Sidebar";
import Content from "features/home/components/Content";
import styled from "styled-components/macro";

const Home = () => {
  return (
    <Container>
        <Sidebar />
        <Content />
    </Container>
  )
}

export default Home

const Container = styled("section")`
  height: 100%;
  display: flex;
  gap: 5rem;
`
