import Footer from '../components/Footer';
import NavHeader from '../components/NavHeader';
import mockData from '../data/mockData.json';

function TopSongs() {
  // Samla alla låtar från alla användare i en enda array
  const allSongs = mockData.users.flatMap((user) => user.topSongs);

  // Sortera låtarna från mest till minst streams
  const sortedSongs = allSongs.sort((a, b) => b.streams - a.streams);

  return (
    <>
      <NavHeader />
      <div className='p-4'>
        <h2 className='text-2xl text-secondary font-bold mb-4'>Top songs</h2>
        <ul className='list-decimal pl-5 text-tertiary'>
          {sortedSongs.map((songObj, index) => (
            <li key={index} className='py-2 border-b border-gray-300'>
              <span className='font-semibold'>{songObj.song}</span> -{' '}
              {songObj.artist} ({songObj.streams} streams)
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
}

export default TopSongs;
