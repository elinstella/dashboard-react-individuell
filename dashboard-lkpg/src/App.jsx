import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import Profiles from './pages/Profiles';
import AllProfiles from './pages/AllProfiles';
import TopSongs from './pages/TopSongs';
import SongDetail from './pages/SongDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/profiles/:id',
    element: <Profiles />,
  },
  {
    path: '/profiles',
    element: <AllProfiles />,
  },
  {
    path: '/top-songs',
    element: <TopSongs />,
  },
  {
    path: '/songs/:id',
    element: <SongDetail />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
