import { useState } from 'react';
import Dashboard from './components/Dashboard';
import NavHeader from './components/NavHeader';
import Footer from './components/Footer';
import mockData from './data/mockData.json';

function App() {
  return (
    <>
      <NavHeader />
      <Dashboard />
      <Footer /> 
    </>
  );
}

export default App;
