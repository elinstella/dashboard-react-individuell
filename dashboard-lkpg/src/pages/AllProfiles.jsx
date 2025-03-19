import Footer from '../components/Footer';
import NavHeader from '../components/NavHeader';
import mockData from '../data/mockData.json';
import { Link } from 'react-router-dom';

function AllProfiles() {
  return (
    <>
      <NavHeader />
      <div>
        {mockData.users.map((user) => (
          <div
            key={user.id}
            className='flex items-center p-4 bg-white border-b border-gray-200 hover:bg-gray-50 transition'>
            <img
              src={user.profilePicture}
              alt={`${user.name}'s profile`}
              className='w-10 h-10 rounded-full mr-4'
            />
            <div className='flex-grow'>
              <p className='text-lg font-medium text-gray-900'>
                <Link to={`/profiles/${user.id}`}>{user.name}</Link>
                <span className='text-gray-500'>({user.location})</span>
              </p>
              <p className='text-sm text-gray-600'>
                Total Streams: {user.totalStreams}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
export default AllProfiles;
