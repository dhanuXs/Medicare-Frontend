import {createBrowserRouter} from "react-router-dom";
import SignInPage from "../pages/SignInPage/SignInPage.jsx";
import ErrorPage from "../pages/ErrorPage/ErrorPage.jsx";
import HomePage from "../pages/HomePage/HomePage.jsx";
import SignUp from "../pages/SignUpPage/SignUp.jsx";
import AboutPage from "../pages/AboutPage/AboutPage.jsx";
import App from "../App.jsx";

const routes = createBrowserRouter([
    // Public Routes
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "signin",
                element: <SignInPage />,
            },
            {
                path: "signup",
                element: <SignUp />,
            },
            {
                path: "about",
                element: <AboutPage />
            },

        ],
    }]);
export default routes;