import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/homePage/HomePage";
import Login from "../pages/loginPage/LoginPage";
import Register from "../pages/signupPage/SignupPage";
// import NotFound from './pages/NotFound';
import Playing from "../components/playing/Playing";
import Dashboard from "../pages/admin/Dashboard";
import {
  ADMIN_DASHBOARD,
  ADMIN_EPISODE_CATEGORY,
  ADMIN_EPISODES,
  ADMIN_HOSTS,
  ADMIN_PODCAST,
  ADMIN_USERS,
  ANYROUTE,
  HOMEPAGE,
  LOGIN,
  REGISTER,
} from "./RoutesNames";
import Hosts from "../pages/admin/hosts/HostsList";
import EpisodesList from "../pages/admin/episodes/EpisodesList";
import EpisodeCategory from "../pages/admin/category/EpisodeCategory";
import Podcast from "../pages/admin/podcast/Podcast";
import Users from "../pages/admin/users/Users";

const router = createBrowserRouter([
  {
    path: HOMEPAGE,
    element: <Home />,
  },
  {
    path: LOGIN,
    element: <Login />,
  },
  {
    path: REGISTER,
    element: <Register />,
  },
  // {
  //     path: '*', element: <NotFound /> }
  // }
  {
    path: ANYROUTE,
    element: <Playing />,
  },
  {
    path: ADMIN_DASHBOARD,
    element: <Dashboard />,
  },
  {
    path: ADMIN_PODCAST,
    element: <Podcast />,
  },
  {
    path: ADMIN_EPISODES,
    element: <EpisodesList />,
  },
  {
    path: ADMIN_HOSTS,
    element: <Hosts />,
  },
  {
    path: ADMIN_EPISODE_CATEGORY,
    element: <EpisodeCategory />,
  },
  {
    path: ADMIN_USERS,
    element: <Users />,
  },
]);

export default router;
