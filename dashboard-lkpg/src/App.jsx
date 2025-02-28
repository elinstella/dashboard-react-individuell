import { useState } from 'react';
import mockData from './data/mockData.json';

function App() {
  return (
    <>
      <h1 className='text-red-500 text-xl bg-amber-800'>Hello world</h1>

      {console.log(mockData)}

      {mockData.users.map((user, index) => (
        <div>
          <h2>{user.name}</h2>
          <h3>{user.location}</h3>
          <h3>{user.email}</h3>
        </div>
      ))}
    </>
  );
}

export default App;
