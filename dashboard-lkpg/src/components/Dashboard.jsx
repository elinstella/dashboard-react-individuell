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

function Dashboard() {
  // Ändra [0] => [2] t.ex för annan user
  const userMusicStats = mockData.users[0];

  return (
    <main className='p-3'>
      <div>
        <h1 className='text-4xl mb-4'>{userMusicStats.name}</h1>
        <p>{userMusicStats.id}</p>
        <p>{userMusicStats.email}</p>
        <p>{userMusicStats.location}</p>
        <p>{userMusicStats.profilePicture}</p>
      </div>

      <div className='h-72'>
        <p className='font-bold'>Monthly streams this year:</p>
        <ResponsiveContainer width={'100%'} height={'100%'}>
          <BarChart data={userMusicStats.monthlyStreams}>
            <XAxis dataKey='month' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='streams' />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h2 className='font-bold'>{userMusicStats.name} top songs:</h2>
        {userMusicStats.topSongs.map((song) => (
          <div>
            <p>
              {song.song} - {song.artist}
            </p>
            <p>Streams: {song.streams}</p>
          </div>
        ))}
      </div>
      {console.log('asd asd ', userMusicStats)}
    </main>
  );
}

export default Dashboard;
