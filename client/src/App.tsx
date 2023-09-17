import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import NavBarApp from './components/UI/NavBarApp';
import MainPage from './components/pages/MainPage';

function App(): JSX.Element {
  return (
    <Container>
      <NavBarApp />
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Container>
  );
}

export default App;
