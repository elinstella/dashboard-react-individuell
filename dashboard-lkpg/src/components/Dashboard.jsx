import mockData from '../data/mockData.json';
import { Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from 'recharts';
import UserLeaderboard from './UserLeaderboard';
import { useState } from 'react';

function Dashboard() {
  const [userMusicStats, setUserMusicStats] = useState(mockData.users[8]);

  // Function to handle user selection from the dropdown
  const handleUserChange = (event) => {
    const selectedUserId = parseInt(event.target.value);
    const selectedUser = mockData.users.find(
      (user) => user.id === selectedUserId
    );
    setUserMusicStats(selectedUser);
  };

  return (
    <main className='p-6 max-w-6xl mx-auto bg-gray-100 min-h-screen'>
      <div className='flex justify-center pb-16'>
        <h2>Users:</h2>
        <select
          className='cursor-pointer text-2xl'
          onChange={handleUserChange}
          value={userMusicStats.id}
        >
          {mockData.users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div className='flex gap-6 flex-wrap md:flex-nowrap'>
        {/* User info and Profile - vänster */}
        <div className='bg-white p-6 rounded-2xl shadow-md w-1/3 min-w-[250px]'>
          <h1 className='text-3xl font-bold mb-2 text-gray-800 underline'>
            <Link to={`/profiles/${userMusicStats.id}`}>
              {userMusicStats.name}
            </Link>
          </h1>
          <p className='text-gray-600 text-sm'>ID: {userMusicStats.id}</p>
          <p className='text-gray-600 text-sm'>Email: {userMusicStats.email}</p>
          <p className='text-gray-600 text-sm'>
            Location: {userMusicStats.location}
          </p>
          <img
            src={userMusicStats.profilePicture}
            alt={userMusicStats.name}
            className='w-20 h-20 rounded-full mt-4 border border-gray-300 shadow-sm'
          />
        </div>

        {/* Monthly streams - höger */}
        <div className='bg-white p-6 rounded-2xl shadow-md w-2/3 min-w-[300px]'>
          <p className='text-lg font-semibold text-gray-800'>
            Monthly streams this year:
          </p>
          <div className='h-96'>
            <ResponsiveContainer width={'100%'} height={'100%'}>
              <BarChart data={userMusicStats.monthlyStreams}>
                <XAxis dataKey='month' className='text-sm' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey='streams' fill='#4F46E5' radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className='flex gap-6 mt-6 flex-wrap md:flex-nowrap'>
        {/* UserLeaderboard - vänster */}
        <div className='bg-white p-6 rounded-2xl shadow-md w-2/3 min-w-[300px]'>
          <UserLeaderboard usersData={mockData} />
        </div>

        {/* Top Songs - höger */}
        <div className='bg-white p-6 rounded-2xl shadow-md w-1/3 min-w-[250px]'>
          <h2 className='text-xl font-semibold text-gray-800 mb-4'>
            Top Songs
          </h2>
          <ul className='grid grid-cols-1 gap-4'>
            {userMusicStats.topSongs.map((song, index) => (
              <li key={index} className='border-b last:border-b-0 py-3'>
                <p className='text-gray-700 font-medium'>
                  {song.song} -{' '}
                  <span className='text-gray-500'>{song.artist}</span>
                </p>
                <p className='text-gray-500'>Streams: {song.streams}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {console.log('User Data: ', userMusicStats)}
    </main>
  );
}

export default Dashboard;
