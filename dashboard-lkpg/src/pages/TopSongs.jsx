import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import NavHeader from '../components/NavHeader';
import mockData from '../data/mockData.json';
import { Link } from 'react-router-dom';
import { getSpotifyToken } from '../api/spotifyToken';

function TopSongs() {
  const [songsWithImages, setSongsWithImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = await getSpotifyToken();
      const songMap = new Map();

      mockData.users.forEach((user) => {
        user.topSongs.forEach((song) => {
          const key = `${song.song}-${song.artist}`;
          if (!songMap.has(key)) {
            songMap.set(key, { ...song });
          } else {
            const existing = songMap.get(key);
            existing.streams += song.streams;
          }
        });
      });

      const uniqueSongs = Array.from(songMap.values()).map((song, index) => ({
        ...song,
        id: index + 1,
      }));

      const enrichedSongs = await Promise.all(
        uniqueSongs.map(async (song) => {
          const query = encodeURIComponent(`${song.song} ${song.artist}`);
          const res = await fetch(
            `https://api.spotify.com/v1/search?q=${query}&type=track&limit=1`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const data = await res.json();
          const track = data.tracks?.items?.[0];

          return {
            ...song,
            image: track?.album?.images?.[0]?.url ?? null,
            preview_url: track?.preview_url ?? null,
          };
        })
      );

      const sorted = enrichedSongs.sort((a, b) => b.streams - a.streams);
      setSongsWithImages(sorted);
    };

    fetchData();
  }, []);

  const filteredSongs = songsWithImages.filter((song) =>
    song.song.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

          {/* Sökfält med tillgänglig etikett */}
          <div className="mb-6 text-center">
            <label htmlFor="search" className="sr-only">
              Search songs or artists
            </label>
            <input
              id="search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by song or artist"
              className="px-4 py-2 w-full max-w-md rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          {/* Lista med låtar */}
          <ul role="list" aria-label="List of top songs">
            {filteredSongs.map((songObj, index) => (
              <li key={songObj.id} role="listitem">
                <Link
                  to={`/songs/${songObj.id}`}
                  className="grid grid-cols-[30px_1fr] gap-4 items-center py-3 border-b border-gray-200 text-lg hover:bg-gray-100 transition rounded-md px-2"
                  state={{ preview_url: songObj.preview_url }}
                >
                  {/* Nummer */}
                  <span className="text-black text-right">{index + 1}.</span>

                  {/* Info */}
                  <div className="flex items-center gap-4 w-full justify-center">
                    {songObj.image && (
                      <img
                        src={songObj.image}
                        alt={`Album cover for ${songObj.song} by ${songObj.artist}`}
                        className="w-27 h-27 rounded-md object-cover"
                      />
                    )}
                    <div className="text-center w-full">
                      <div>
                        <span className="font-bold text-black hover:no-underline">
                          {songObj.song}
                        </span>{' '}
                        –{' '}
                        <span className="font-bold text-black">{songObj.artist}</span>
                      </div>
                      <div className="text-purple-600 text-sm mt-1">
                        ({songObj.streams} streams)
                      </div>
                    </div>
                  </div>
                </Link>
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
