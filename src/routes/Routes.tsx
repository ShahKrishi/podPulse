import { createBrowserRouter } from 'react-router-dom';

// import Layout from './pages/Layout';
import Home from '../pages/homePage/HomePage';
import Login from '../pages/loginPage/LoginPage';
import Register from '../pages/signupPage/SignupPage';
// import NotFound from './pages/NotFound';

const router = createBrowserRouter([
    {
        path: '/',
        // element: <Layout />,
        children: [
            { path: 'home', element: <Home /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            // { path: '*', element: <NotFound /> },
        ],
    },
]);

export default router;
