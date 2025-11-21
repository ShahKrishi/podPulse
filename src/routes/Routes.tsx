import { createBrowserRouter, Outlet } from "react-router-dom";
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
  CONTACT_PAGE,
  HOMEPAGE,
  HOST_DETAILS,
  HOST_PAGE,
  LOGIN,
  PODCAST_DETAILS,
  PODCAST_PAGE,
  REGISTER,
} from "./RoutesNames";
import Hosts from "../pages/admin/hosts/HostsList";
import EpisodesList from "../pages/admin/episodes/EpisodesList";
import EpisodeCategory from "../pages/admin/category/EpisodeCategory";
import Podcast from "../pages/admin/podcast/Podcast";
import Users from "../pages/admin/users/Users";
import PodcastHomePage from "../pages/homePage/podcast/PodcastHomePage";
import HostHomePage from "../pages/homePage/host/HostHomePage";
import ContactUsPage from "../pages/homePage/contact/ContactUsPage";
import PodcastDetailPage from "../pages/homePage/podcast/PodcastDetailPage";
import HostDetailPage from "../pages/homePage/host/HostDetailPage";

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
  {
    path: PODCAST_PAGE,
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <PodcastHomePage />,
      },
      {
        path: `${PODCAST_DETAILS}/:podcastId`,
        element: <PodcastDetailPage />,
      },
    ],
  },
  {
    path: HOST_PAGE,
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <HostHomePage />,
      },
      {
        path: `${HOST_DETAILS}/:hostId`,
        element: <HostDetailPage />,
      },
    ],
  },
  {
    path: CONTACT_PAGE,
    element: <ContactUsPage />,
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
