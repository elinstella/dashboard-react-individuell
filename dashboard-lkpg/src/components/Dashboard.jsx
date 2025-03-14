import mockData from '../data/mockData.json';
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

function Dashboard() {
  const userMusicStats = mockData.users[8];

  return (
    <main className='min-h-screen p-8 bg-gray-100'>
      <div className='max-w-8xl mx-auto bg-white p-6 border border-gray-300 rounded-xl'>
        <div className='flex flex-wrap sm:flex-nowrap gap-6'>
          
          <div className='bg-white p-6 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.1)] w-full sm:w-1/3 min-w-[250px]'>
            <h1 className='text-3xl font-bold mb-2 text-primary'>
              {userMusicStats.name}
            </h1>
            <p className='text-secondary text-sm'>ID: {userMusicStats.id}</p>
            <p className='text-secondary text-sm'>Email: {userMusicStats.email}</p>
            <p className='text-secondary text-sm'>Location: {userMusicStats.location}</p>
            <img
              src={userMusicStats.profilePicture}
              alt={userMusicStats.name}
              className='w-20 h-20 rounded-full mt-4 border border-quaternary shadow-[0_2px_8px_rgba(0,0,0,0.15)]'
            />
          </div>

          <div className='bg-white p-6 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.1)] w-full sm:w-2/3 min-w-[300px]'>
            <p className='text-lg font-semibold text-primary'>
              Monthly streams this year:
            </p>
            <div className='h-96'>
              <ResponsiveContainer width={'100%'} height={'100%'}>
                <BarChart data={userMusicStats.monthlyStreams}>
                  <XAxis dataKey='month' className='text-sm' />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey='streams' fill='var(--color-primary)' radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-5 gap-6 mt-6'>
          <div className='bg-white p-6 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.1)] sm:col-span-3'>
            <UserLeaderboard usersData={mockData} />
          </div>

          <div className='bg-white p-6 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.1)] sm:col-span-2'>
            <h2 className='text-3xl font-semibold text-primary mb-4'>Top Songs</h2>
            <ul className='grid grid-cols-1 gap-4'>
              {userMusicStats.topSongs.map((song, index) => (
                <li key={index} className='border-b last:border-b-0 py-3'>
                  <p className='text-black font-medium'>
                    {song.song} - <span className='text-quaternary'>{song.artist}</span>
                  </p>
                  <p className='text-primary'>Streams: {song.streams}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
