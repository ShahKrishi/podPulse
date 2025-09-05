import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/homePage/HomePage';
import Login from '../pages/loginPage/LoginPage';
import Register from '../pages/signupPage/SignupPage';
// import NotFound from './pages/NotFound';
import Playing from '../components/playing/Playing';
import Dashboard from '../pages/admin/Dashboard';
import { ADMIN_DASHBOARD, ADMIN_EPISODE_CATEGORY, ADMIN_EPISODES, ADMIN_HOSTS, ANYROUTE, HOMEPAGE, LOGIN, REGISTER } from './RoutesNames'
import Hosts from '../pages/admin/hosts/HostsList';
import Episodes from '../pages/admin/episodes/Episodes';
import EpisodeCategory from '../pages/admin/category/EpisodeCategory';

const router = createBrowserRouter([
    {
        path: HOMEPAGE,
        element: <Home />,
    },
    {
        path: LOGIN,
        element: <Login />
    },
    {
        path: REGISTER,
        element: <Register />
    },
    // {
    //     path: '*', element: <NotFound /> }
    // }
    {
        path: ANYROUTE,
        element: <Playing />
    },
    {
        path: ADMIN_DASHBOARD,
        element: <Dashboard />
    },
    {
        path: ADMIN_EPISODES,
        element: <Episodes />
    },
    {
        path: ADMIN_HOSTS,
        element: <Hosts />
    },
    {
        path: ADMIN_EPISODE_CATEGORY,
        element: <EpisodeCategory />
    }
]);

export default router;
