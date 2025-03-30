import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import NavHeader from '../components/NavHeader';
import mockData from '../data/mockData.json';

function AllProfiles() {
  return (
    <>
      <NavHeader />
      <main className="bg-gray-100 min-h-screen py-12 px-4">
        <div className="bg-white rounded-2xl shadow-md max-w-3xl mx-auto p-8">
          {/* Rubrik + understräck */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-black">All Profiles</h2>
            <div className="h-1 w-48 bg-purple-600 mx-auto mt-3 rounded-full" />
          </div>

          {/* Lista */}
          <div className="space-y-2">
            {mockData.users.map((user) => (
              <Link
                key={user.id}
                to={`/profiles/${user.id}`}
                className="block hover:bg-gray-50 transition rounded-md"
              >
                <div className="flex items-center gap-4 p-4 border-b border-gray-200 pl-4">
                  {/* Profilbild vertikalt med text, men lite indraget */}
                  <img
                    src={user.profilePicture}
                    alt={`${user.name}'s profile`}
                    className="w-12 h-12 rounded-full border border-gray-300 shadow-sm"
                  />
                  <div>
                    <p className="text-lg font-medium text-gray-900">
                      {user.name}{' '}
                      <span className="text-gray-500">({user.location})</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Total Streams: {user.totalStreams}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default AllProfiles;
