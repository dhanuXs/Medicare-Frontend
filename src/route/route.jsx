import {createBrowserRouter} from "react-router-dom";
import SignInPage from "../pages/SignInPage/SignInPage.jsx";
import SignUp from "../pages/SignUpPage/SignUp.jsx";
import User from "../pages/UserPage/User.jsx";
import User1 from "../admin/User/User.jsx";
import Dashboard from "../admin/Dashboard/Dashboard.jsx"
import Doctor from "../admin/Doctors/Doctor.jsx";
import Appointment from "../admin/Appointment/Appointment.jsx";
import PatientQueue from "../admin/Queue/PatientQueue.jsx";
import EditDoctor from "../component/editDoctor/EditDoctor.jsx";
import DoctorSchedule from "../component/doctorSchedule/DoctorSchedule.jsx";
import AppointmentPage from "../pages/AppointmentPage/Appointment.jsx";
import StartPage from "../pages/StartPage/StartPage.jsx";
import UpdateUser from "../admin/User/UpdateUser.jsx";

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
        element: <StartPage />,
    },
    {
        path: "/home",
        index: true,
        element: <User />
    },
    {
        path: "/admin",
        index: true,
        element: <Dashboard />
    },
    {
        path: "/user",
        index: true,
        element: <User1 />
    },
    {
        path: "/doctor",
        index: true,
        element: <Doctor />
    },
   ,
    {
        path: "/appointment",
        index: true,
        element: <Appointment />
    },
    {
        path: "/queue",
        index: true,
        element: <PatientQueue />
    },
    {
        path: "/doctor/edit",
        index: true,
        element: <EditDoctor />
    },
    {
        path: "/doctor/schedule",
        index: true,
        element: <DoctorSchedule />
    },
    {
        path: "/user/appointment",
        index: true,
        element: <AppointmentPage />
    },
    {
        path: "/home",
        index: true,
        element: <User />
    },
    {
        path: "/user/edit",
        index: true,
        element: <UpdateUser />
    }
    ]);
export default routes;