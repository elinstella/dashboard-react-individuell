import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import NavHeader from '../components/NavHeader';
import mockData from '../data/mockData.json';

function AllProfiles() {
  const calculateTotalStreams = (user) => {
    return user.monthlyStreams.reduce((sum, month) => sum + month.streams, 0);
  };

  return (
    <>
      <NavHeader />
      <main className="bg-gray-100 min-h-screen py-12 px-4">
        <div className="bg-white rounded-2xl shadow-md max-w-3xl mx-auto p-8">
          {/* Rubrik */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-black">All Profiles</h2>
            <div className="h-1 w-48 bg-purple-600 mx-auto mt-3 rounded-full" />
          </div>

          {/* Lista */}
          <ul className="space-y-2" role="list" aria-label="List of user profiles">
            {mockData.users.map((user) => {
              const totalStreams = calculateTotalStreams(user);

              return (
                <li key={user.id} role="listitem">
                  <Link
                    to={`/profiles/${user.id}`}
                    className="block hover:bg-gray-50 transition rounded-md"
                  >
                    <div className="flex items-center gap-4 p-4 border-b border-gray-200 pl-4">
                      <img
                        src={user.profilePicture}
                        alt={`Profile picture of ${user.name}`}
                        className="w-12 h-12 rounded-full border border-gray-300 shadow-sm"
                      />
                      <div>
                        <p className="text-lg font-medium text-gray-900">
                          {user.name}{' '}
                          <span className="text-gray-500">({user.location})</span>
                        </p>
                        <p className="text-sm text-gray-600">
                          Total Streams:{' '}
                          <span className="text-purple-600 font-semibold">
                            {totalStreams}
                          </span>
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default AllProfiles;
