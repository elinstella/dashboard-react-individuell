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

  const handleUserChange = (event) => {
    const selectedUserId = parseInt(event.target.value);
    const selectedUser = mockData.users.find(
      (user) => user.id === selectedUserId
    );
    setUserMusicStats(selectedUser);
  };

  return (
    <main className="bg-gray-100 min-h-screen py-12 px-4">
      <div className="bg-white rounded-2xl shadow-md max-w-6xl mx-auto p-8">
        {/* Huvudrubrik */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-black"> Dashboard</h2>
          <div className="h-1 w-48 bg-purple-600 mx-auto mt-3 rounded-full" />
        </div>

        {/* Dropdown */}
        <div className="flex flex-col items-center gap-4 pb-12 md:flex-row md:justify-center">
          <h3 className="text-2xl font-bold text-black">Users:</h3>
          <select
            className="cursor-pointer text-xl border border-gray-300 rounded-md px-3 py-1 shadow-sm"
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

        {/* Info + Chart */}
        <div className="flex gap-6 flex-wrap md:flex-nowrap">
          {/* User Info */}
          <div className="bg-gray-50 p-6 rounded-2xl shadow-sm w-full md:w-1/3">
            <h3 className="text-2xl font-bold mb-2 text-gray-800 underline">
              <Link to={`/profiles/${userMusicStats.id}`}>
                {userMusicStats.name}
              </Link>
            </h3>
            <p className="text-gray-600 text-sm">ID: {userMusicStats.id}</p>
            <p className="text-gray-600 text-sm">Email: {userMusicStats.email}</p>
            <p className="text-gray-600 text-sm">
              Location: {userMusicStats.location}
            </p>
            <img
              src={userMusicStats.profilePicture}
              alt={userMusicStats.name}
              className="w-20 h-20 rounded-full mt-4 border border-gray-300 shadow-sm"
            />
          </div>

          {/* Monthly Chart */}
          <div className="bg-gray-50 p-6 rounded-2xl shadow-sm w-full md:w-2/3">
            <h3 className="text-2xl font-bold text-black mb-4">
              Monthly streams this year:
            </h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userMusicStats.monthlyStreams}>
                  <XAxis dataKey="month" className="text-sm" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="streams" fill="#4F46E5" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Leaderboard + Top Songs */}
        <div className="flex gap-6 mt-6 flex-wrap md:flex-nowrap">
          {/* Leaderboard */}
          <div className="bg-gray-50 p-6 rounded-2xl shadow-sm w-full md:w-2/3">
            <UserLeaderboard usersData={mockData} />
          </div>

          {/* Top Songs */}
          <div className="bg-gray-50 p-6 rounded-2xl shadow-sm w-full md:w-1/3">
            <h3 className="text-2xl font-bold text-black mb-4">
              Top Songs
            </h3>
            <ul className="grid grid-cols-1 gap-4">
              {userMusicStats.topSongs.map((song, index) => (
                <li key={index} className="border-b last:border-b-0 py-3">
                  <p className="text-gray-700 font-medium">
                    {song.song} -{' '}
                    <span className="text-gray-500">{song.artist}</span>
                  </p>
                  <p className="text-purple-600">Streams: {song.streams}</p>
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
