import { useState } from 'react';
import Dashboard from './components/Dashboard';
import NavHeader from './components/NavHeader';
import Footer from './components/Footer';
import UserLeaderboard from './components/UserLeaderboard';
import mockData from './data/mockData.json';

function App() {
  return (
    <>
    <UserLeaderboard usersData={mockData} />
      <NavHeader />
      <Dashboard />
      <Footer /> 
    </>
  );
}

export default App;
