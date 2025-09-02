import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/homePage/HomePage';
import Login from '../pages/loginPage/LoginPage';
import Register from '../pages/signupPage/SignupPage';
// import NotFound from './pages/NotFound';
import Playing from '../components/playing/Playing';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/login', element: <Login />
    },
    {
        path: '/register', element: <Register />
    },
    // {
    //     path: '*', element: <NotFound /> }
    // }
    {
        path: '/any', element: <Playing />
    }
]);

export default router;
