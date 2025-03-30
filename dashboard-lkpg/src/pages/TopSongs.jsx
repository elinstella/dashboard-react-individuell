import Footer from '../components/Footer';
import NavHeader from '../components/NavHeader';
import mockData from '../data/mockData.json';

function TopSongs() {
  const allSongs = mockData.users.flatMap((user) => user.topSongs);
  const sortedSongs = allSongs.sort((a, b) => b.streams - a.streams);

  return (
    <>
      <NavHeader />
      <main className="bg-gray-100 min-h-screen py-12 px-4">
        <div className="bg-white rounded-2xl shadow-md max-w-3xl mx-auto p-8">
          {/* Rubrik */}
          <div className="text-center mb-10">
  <h2 className="text-3xl font-bold text-black">Top Songs</h2>
  <div className="h-1 w-48 bg-purple-600 mx-auto mt-3 rounded-full" />
</div>


          {/* Lista */}
          <ul>
            {sortedSongs.map((songObj, index) => (
              <li
                key={index}
                className="grid grid-cols-[30px_1fr] gap-4 items-start py-3 border-b border-gray-200 text-lg"
              >
                {/* Ranking */}
                <span className=" text-black text-right">{index + 1}.</span>

                {/* Låtinfo centrerat */}
                <span className="text-center w-full">
                  <span className="font-bold text-black">{songObj.song}</span> –{' '}
                  <span className=" text-black">{songObj.artist}</span>{' '}
                  <span className="text-purple-600">({songObj.streams} streams)</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default TopSongs;
