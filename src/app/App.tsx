import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from 'common/constant/routes';
import Home from 'features/home/Home';
import PageNotFound from 'common/components/pageNotFound/PageNotFound';
import styled from "styled-components/macro";

function App() {
  return (
    <Container className='App'>
      <Router>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home/>} />
          <Route path={"/404"} element={<PageNotFound />}/>
          <Route path={"/*"} element={<Navigate to={"/404"} />} />
        </Routes>
      </Router>
    </Container>);
}

export default App;

const Container = styled("div")`
    height: 100vh;
`