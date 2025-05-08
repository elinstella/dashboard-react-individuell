import { useParams, Link } from 'react-router-dom';
import mockData from '../data/mockData.json';
import { useEffect, useState } from 'react';
import { getSpotifyToken } from '../api/spotifyToken';
import NavHeader from '../components/NavHeader';
import Footer from '../components/Footer';

function SongDetail() {
  // 🔢 Hämta ID:t från URL-parametern
  const { id } = useParams();
  const songId = parseInt(id);

  // 🎨 State för albumomslag och Spotify-länk
  const [albumImage, setAlbumImage] = useState(null);
  const [spotifyUrl, setSpotifyUrl] = useState(null);

  // 🗺️ Skapa en Map för att identifiera unika låtar och summera streams
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

  // 🎵 Skapa en lista med ID för varje unik låt
  const allSongs = Array.from(songMap.values());
  const songsWithId = allSongs.map((song, index) => ({ ...song, id: index + 1 }));

  // 🎯 Hitta den valda låten baserat på ID från URL
  const selectedSong = songsWithId.find((song) => song.id === songId);

  // 👥 Filtrera användare som har denna låt i sin topplista
  const usersWithThisSong = mockData.users.filter((user) =>
    user.topSongs.some(
      (song) =>
        song.song === selectedSong?.song && song.artist === selectedSong?.artist
    )
  );

  // 🌐 Hämta metadata från Spotify för albumomslag och extern länk
  useEffect(() => {
    const fetchSpotifyData = async () => {
      if (!selectedSong) return;

      // 🔑 Hämta token
      const token = await getSpotifyToken();

      // 🔍 Bygg sökfråga och API-url
      const query = encodeURIComponent(`track:${selectedSong.song} artist:${selectedSong.artist}`);
      const url = `https://api.spotify.com/v1/search?q=${query}&type=track&limit=5`;

      try {
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        const firstTrack = data.tracks?.items?.[0];

        // 🖼️ Spara bild och Spotify-länk om de finns
        if (firstTrack) {
          setAlbumImage(firstTrack.album.images[0]?.url ?? null);
          setSpotifyUrl(firstTrack.external_urls.spotify ?? null);
        }
      } catch (error) {
        console.error('❌ Spotify API error:', error);
      }
    };

    fetchSpotifyData();
  }, [selectedSong]);

  // 🚨 Om låten inte hittas
  if (!selectedSong) {
    return <div className="p-6 text-red-500">Song not found</div>;
  }

  return (
    <>
      <NavHeader />
      <main className="bg-gray-100 min-h-screen py-12 px-4">
        <div className="bg-white rounded-2xl shadow-md max-w-3xl mx-auto p-8">
          {/* 🎵 Låttitel och artist */}
          <h1 className="text-3xl font-bold text-black text-center">
            {selectedSong.song}
          </h1>
          <p className="text-center text-gray-600 mb-4">by {selectedSong.artist}</p>

          {/* 🎨 Albumomslag (från Spotify eller fallback-bild) */}
          <div className="flex justify-center mb-4">
            <img
              src={
                albumImage ??
                `https://source.unsplash.com/400x400/?music,album,covers&sig=${selectedSong.id}`
              }
              alt={`Album cover for ${selectedSong.song} by ${selectedSong.artist}`}
              className="w-60 h-60 rounded-lg shadow object-cover"
            />
          </div>

          {/* 🔗 Länk till Spotify */}
          {spotifyUrl && (
            <div className="text-center mb-6">
              <a
                href={spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-purple-600 hover:underline"
              >
                Open in Spotify ↗
              </a>
            </div>
          )}

          {/* 🔢 Antal streams */}
          <div className="text-center text-purple-600 font-semibold text-lg mb-6">
            Total Streams: {selectedSong.streams}
          </div>

          {/* 👥 Lista över användare som har denna låt */}
          <h3
            className="text-xl font-bold text-black mb-4"
            id="users-heading"
          >
            Used by:
          </h3>
          <ul
            className="space-y-4"
            role="list"
            aria-labelledby="users-heading"
          >
            {usersWithThisSong.map((user) => (
              <li
                key={user.id}
                className="flex items-center gap-4 bg-gray-50 p-4 rounded-md"
                role="listitem"
              >
                <img
                  src={user.profilePicture}
                  alt={`Profile picture of ${user.name}`}
                  className="w-12 h-12 rounded-full border"
                />
                <div>
                  <Link
                    to={`/profiles/${user.id}`}
                    className="text-lg font-semibold hover:underline"
                  >
                    {user.name}
                  </Link>
                  <p className="text-sm text-gray-500">{user.location}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default SongDetail;
