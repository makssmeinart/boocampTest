import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from 'common/constant/routes';
import Home from 'features/home/Home';
import PageNotFound from 'common/components/pageNotFound/PageNotFound';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home/>} />
          <Route path={"/404"} element={<PageNotFound />}/>
          <Route path={"/" } element={<Navigate to={ROUTES.DEFAULT_OPTIONS} />}/>
          <Route path={"/*"} element={<Navigate to={"/404"} />} />
        </Routes>
      </Router>
    </div>);
}

export default App;
