import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/common/Navbar/Navbar';
import Footer from './components/common/Footer/Footer';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main style={{ minHeight: '80vh' }}>
        <AppRoutes />
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;