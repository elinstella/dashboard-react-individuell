import React from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import NavHeader from '../components/NavHeader';
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

function Profiles() {
  const { id } = useParams();
  const user = mockData.users.find((user) => user.id === parseInt(id));

  if (!user) {
    return <div className="p-6 text-red-500">User not found</div>;
  }

  const totalStreams = user.monthlyStreams.reduce(
    (sum, month) => sum + month.streams,
    0
  );

  return (
    <>
      <NavHeader />
      <main className="bg-gray-100 min-h-screen py-12 px-4">
        <div className="bg-white rounded-2xl shadow-md max-w-4xl mx-auto p-8">
          {/* Rubrik */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-black">{user.name}</h1>
            <div className="h-1 w-48 bg-purple-600 mx-auto mt-3 rounded-full" />
          </div>

          {/* Profilinfo */}
          <div className="text-center mb-8">
            <img
              src={user.profilePicture}
              alt={`Profile picture of ${user.name}`}
              className="w-24 h-24 rounded-full mx-auto mb-4 border border-gray-300 shadow-sm"
            />
            <p className="text-gray-700">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-gray-700">
              <strong>Location:</strong> {user.location}
            </p>
            <p className="text-gray-700">
              <strong>Total Streams:</strong>{' '}
              <span className="text-purple-600 font-semibold">{totalStreams}</span>
            </p>
          </div>

          {/* Monthly Streams Chart */}
          <div className="mb-10">
            <h2
              className="text-2xl font-bold text-black text-center mb-4"
              id="streams-heading"
            >
              Monthly Streams
            </h2>
            <div className="h-96" role="img" aria-labelledby="streams-heading">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={user.monthlyStreams}>
                  <XAxis dataKey="month" className="text-sm" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="streams" fill="#4F46E5" radius={[5, 5, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Songs */}
          <div>
            <h2 className="text-2xl font-bold text-black text-center mb-6">
              Top Songs
            </h2>
            <ul role="list" aria-label="List of top songs">
              {user.topSongs.map((song, index) => (
                <li
                  key={index}
                  className="grid grid-cols-[30px_1fr] gap-4 items-start py-3 border-b border-gray-200 text-lg"
                  role="listitem"
                >
                  <span className="text-black text-right">{index + 1}.</span>
                  <span className="text-center w-full">
                    <span className="font-bold text-black">{song.song}</span> –{' '}
                    <span className="text-black">{song.artist}</span>{' '}
                    <span className="text-purple-600">({song.streams} streams)</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Profiles;
