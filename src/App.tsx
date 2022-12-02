import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ROUTES } from "constant/routes";
import Home from "pages/home/Home";
import PageNotFound from "components/pageNotFound/PageNotFound";
import styled, { ThemeProvider } from "styled-components/macro";
import lightTheme from "common/styles/light";
import darkTheme from "common/styles/dark";
import { useSelector } from "react-redux";
import { selectAppData } from "store/selectors";
import { ErrorSnackbar } from "components/errorSnackbar/ErrorSnackbar";
import ScrollToTop from "components/scrollToTop/ScrollToTop";

function App() {
  const { error } = useSelector(selectAppData);
  const { theme } = useSelector(selectAppData);
  const currentTheme = theme === "dark" ? darkTheme : lightTheme;

  return (
    <Container>
      <ThemeProvider theme={currentTheme}>
        <ScrollToTop />
        <Router>
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.PAGE_NOT_FOUND} element={<PageNotFound />} />
            <Route
              path={"/*"}
              element={<Navigate to={ROUTES.PAGE_NOT_FOUND} />}
            />
          </Routes>
        </Router>
        {error && <ErrorSnackbar />}
      </ThemeProvider>
    </Container>
  );
}

export default App;

const Container = styled("div")`
  height: 100vh;
`;
