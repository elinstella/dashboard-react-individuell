import { useState } from 'react';
import mockData from './data/mockData.json';

function App() {
  // List of months in order
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <>
      <h1 className='text-red-500 text-xl bg-amber-800'>Hello world</h1>

      {console.log(mockData)}

      {mockData.users.map((user, index) => (
        <div>
          <p>id: {user.id}</p>
          <h2>{user.name}</h2>
          <h3>{user.location}</h3>
          <h3>{user.email}</h3>
          <img src={user.profilePicture} alt='' />
          <h4>Top songs:</h4>
          <ul>
            {user.topSongs.map((song, songIndex) => (
              <li key={songIndex}>
                {song.song} by {song.artist} (Streams: {song.streams})
              </li>
            ))}
          </ul>

          <h4>Monthly Stream</h4>
          <ul>
            {months.map((month, index) => (
              <li key={index}>
                {month}: {mockData.users[1].monthlyStreams[month]} streams
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}

export default App;
