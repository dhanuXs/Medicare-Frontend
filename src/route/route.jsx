import {createBrowserRouter} from "react-router-dom";
import SignInPage from "../pages/SignInPage/SignInPage.jsx";
import ErrorPage from "../pages/ErrorPage/ErrorPage.jsx";
import HomePage from "../pages/HomePage/HomePage.jsx";
import SignUp from "../pages/SignUpPage/SignUp.jsx";
import AboutPage from "../pages/AboutPage/AboutPage.jsx";
import App from "../App.jsx";
import User from "../pages/UserPage/User.jsx";

const routes = createBrowserRouter([
    // Public Routes
    {
        path: "/signUp",
        index: true,
        element: <SignUp />,
    },
    {
        path: "/signin",
        index: true,
        element: <SignInPage />,
    },
    {
        path: "/",
        index: true,
        element: <SignUp />,
    },
    {
        path: "/home",
        index: true,
        element: <User />
    }
    ]);
export default routes;