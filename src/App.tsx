import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { ROUTES } from "constant/routes";
import styled, { ThemeProvider } from "styled-components/macro";
import { useSelector } from "react-redux";
import { selectAppData } from "store/selectors";
import { ErrorSnackbar, ScrollToTop } from "components";
import { CatsPage, NotFound } from "pages";
import { darkTheme, lightTheme } from "styles";

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
            <Route
              path={ROUTES.HOME}
              element={<Navigate to={ROUTES.NO_CATEGORY} />}
            />
            <Route path={ROUTES.CATS} element={<CatsPage />} />
            <Route path={"/*"} element={<NotFound />} />
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
