import { createBrowserRouter } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Protected from "./layouts/protected";
import Public from "./layouts/public";
import Root from "./layouts/root";
import Customer from "./pages/customer";
import Events from "./pages/events";
import File from "./pages/file";
import Dashboard from "./pages/dashboard";
import Home from "./pages/home";
import PhotoSelection from "./pages/photoSelection";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/app',
                element: <Protected />,
                children: [
                    {
                        path: 'dashboard',
                        element: <Dashboard />
                    },
                    {
                        path: 'customers',
                        element: <Customer />
                    },
                    {
                        path: 'events',
                        element: <Events />
                    },
                    {
                        path: 'events/:id',
                        element: <File />
                    }
                ]
            },
            {
                path: '/auth',
                element: <Public />,
                children: [
                    {
                        path: 'signup',
                        element: <Signup />
                    },
                    {
                        path: 'login',
                        element: <Login />
                    },
                    {
                        path: 'photo-selection',
                        element: <PhotoSelection />,
                    },
                ]
            }
        ]
    }


])