import { useState } from 'react';
import mockData from './data/mockData.json';

function App() {
  return (
    <>
      <h1 className='text-red-500 text-xl bg-amber-800'>Hello world</h1>
      {console.log(mockData)}
    </>
  );
}

export default App;
