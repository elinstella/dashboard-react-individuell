import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import NavHeader from '../components/NavHeader';
import mockData from '../data/mockData.json'; // Adjust the path if necessary
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from 'recharts';

function Profiles() {
  // Step 1: Extract the `id` parameter from the URL
  const { id } = useParams();

  // Step 2: Find the user with the matching ID
  const user = mockData.users.find((user) => user.id === parseInt(id));

  // Step 3: Handle the case where the user is not found
  if (!user) {
    return <div className='p-6 text-red-500'>User not found</div>;
  }

  return (
    <>
      <NavHeader />
      <main className='p-6'>
        <div className='max-w-4xl mx-auto'>
          <div className='flex gap-4 items-center justify-center'>
            <button className='text-4xl'>
              <Link to='/'>⬅️</Link>
            </button>
            <h1 className='text-4xl font-bold mb-4'>{user.name}</h1>
          </div>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <img
              src={user.profilePicture}
              alt={`${user.name}'s profile`}
              className='w-24 h-24 rounded-full mx-auto mb-4'
            />
            <p className='text-gray-600 text-center mb-2'>
              <strong>Email:</strong> {user.email}
            </p>
            <p className='text-gray-600 text-center mb-4'>
              <strong>Location:</strong> {user.location}
            </p>

            <div className='mt-6'>
              <h2 className='text-2xl font-bold mb-4'>Monthly Streams</h2>
              <div className='h-96'>
                <ResponsiveContainer width='100%' height='100%'>
                  <BarChart data={user.monthlyStreams}>
                    <XAxis dataKey='month' className='text-sm' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey='streams'
                      fill='#4F46E5'
                      radius={[5, 5, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className='mt-6'>
              <h2 className='text-2xl font-bold mb-4'>Top Songs</h2>
              <ul className='space-y-3'>
                {user.topSongs.map((song) => (
                  <li
                    key={song.song}
                    className='bg-gray-50 p-4 rounded-lg shadow-sm'
                  >
                    <p className='text-lg font-medium'>
                      {song.song} - {song.artist}
                    </p>
                    <p className='text-sm text-gray-600'>
                      Streams: {song.streams}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Profiles;
