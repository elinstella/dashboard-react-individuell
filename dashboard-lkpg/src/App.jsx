import { useState } from 'react';
import Dashboard from './components/Dashboard';
import NavHeader from './components/NavHeader';
import Footer from './components/Footer';
import UserLeaderboard from './components/UserLeaderboard';
import mockData from './data/mockData.json';

function App() {
  return (
    <>
      <NavHeader />
      <Dashboard />
      <UserLeaderboard usersData={mockData} />
      <Footer />
    </>
  );
}

export default App;
