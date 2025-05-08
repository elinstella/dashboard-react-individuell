import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserLeaderboard = ({ usersData }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (usersData && usersData.users && Array.isArray(usersData.users)) {
      const sortedUsers = usersData.users
        .map((user) => {
          const totalStreams = user.monthlyStreams.reduce(
            (sum, { streams }) => sum + streams,
            0
          );
          return { ...user, totalStreams };
        })
        .sort((a, b) => b.totalStreams - a.totalStreams);

      setUsers(sortedUsers);
    } else {
      console.error('Invalid or missing users data:', usersData);
    }
  }, [usersData]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h3 className="text-2xl font-bold text-black mb-4">
        User Streams Leaderboard
      </h3>
      {users.length === 0 ? (
        <p className="text-gray-500">
          No users to display. Check the console for errors.
        </p>
      ) : (
        <ul className="space-y-2" role="list">
          {users.map((user, index) => (
            <li
              key={user.id}
              className="bg-white border border-gray-200 rounded-md transition hover:bg-gray-100"
              role="listitem"
            >
              <Link
                to={`/profiles/${user.id}`}
                className="flex items-center p-4"
              >
                <span className="text-lg font-semibold text-gray-600 w-8">
                  {index + 1}.
                </span>
                <img
                  src={user.profilePicture}
                  alt={`Profile picture of ${user.name}`}
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    {user.name}{' '}
                    <span className="text-gray-500">({user.location})</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Total Streams:{' '}
                    <span className="text-purple-600 font-semibold">
                      {user.totalStreams}
                    </span>
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserLeaderboard;
