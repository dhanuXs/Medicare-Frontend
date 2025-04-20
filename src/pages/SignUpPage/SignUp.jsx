import React, {useState} from "react";
import axios from "axios";
import {Alert} from "@mui/material";
import AlertComp from "../../component/alert/AlertComp.jsx";

const SignUp = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [name, setName] = React.useState("");
    const [alert, setAlert] = useState(null);

    const handleSignUp = async () => {
        console.log(name, email, password, phone);
        await axios.post("http://localhost:8080/api/v1/user/register", {
            name: name,
            email: email,
            password: password,
            contactNumber: phone,
            imgUrl: "https://i.pravatar.cc/150?img=1",
            role: "USER"

        })
            .then(res => {
                console.log(res);
                alert("Register Successfully!")
                setAlert({ type: "success", message: "Registered Successfully!" });
            })
            .catch(err => {err.preventDefault(); console.log(err);})
            setAlert({ type: "error", message: "Registration failed!" });

    }
    return (
    <div className="relative">
        <div className="absolute d-flex justify-center w-full">
            {alert && (
                <AlertComp
                           severity={alert.type}
                           message={alert.message}
                           autoClose={true}
                           duration={5000}
                           onCloseCallback={() => setAlert(null)} // Clear the alert on close
                />
            )}
        </div>

        <div className="flex h-screen bg-gradient-to-r from-blue-50 to-cyan-100">
            {/* Left Section: Form */}
            <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center bg-white shadow-lg">
                <div className="max-w-sm w-full ">
                    <h1 className="text-4xl font-extrabold text-[#00B4D8] mb-6">
                        Create Your Account!
                    </h1>
                    <p className="text-gray-500 mb-6">
                        Join thousands of designers and professionals all over the world.
                    </p>
                    <button className="flex items-center justify-center bg-[#00B4D8] hover:bg-[#0097B2] text-white px-4 py-2 w-full rounded-md mb-4 shadow">
                        <i className="mr-2"><img className="w-5" src="/src/assets/logo/icons8-google-48.png" alt="google logo"/></i> Sign Up with Google
                    </button>
                    <button className="flex items-center justify-center bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 w-full rounded-md mb-4 shadow">
                        <i className="mr-2"><img className="w-5" src="/src/assets/logo/icons8-apple-50.png" alt="google logo"/></i> Sign Up with Apple
                    </button>
                    <p className="text-center text-gray-500 my-4">or</p>

                    <form>
                        {/* Name */}
                        <label className="block mb-4">
                            <p className="text-sm font-medium">What should we call you?</p>
                            <input
                                type="text"
                                placeholder="e.g. Bonnie Green"
                                className="w-full border border-gray-300 focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8] rounded-md px-4 py-2 text-gray-700"
                                required
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                        </label>
                        {/* Email */}
                        <label className="block mb-4">
                            <p className="text-sm font-medium">Your email</p>
                            <input
                                type="email"
                                placeholder="name@company.com"
                                className="w-full border border-gray-300 focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8] rounded-md px-4 py-2 text-gray-700"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </label>
                        {/* Password */}
                        <label className="block mb-4">
                            <p className="text-sm font-medium">Your password</p>
                            <input
                                type="password"
                                placeholder="********"
                                className="w-full border border-gray-300 focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8] rounded-md px-4 py-2 text-gray-700"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </label>
                        {/*{Phone}*/}
                        <label className="block mb-4">
                            <p className="text-sm font-medium">Your Phone</p>
                            <input
                                type="number"
                                placeholder="+91 9876543210"
                                className="w-full border border-gray-300 focus:border-[#00B4D8] focus:ring-2 focus:ring-[#00B4D8] rounded-md px-4 py-2 text-gray-700"
                                required
                                onChange={(e) => setPhone(e.target.value)}
                                value={phone}
                            />
                        </label>
                        {/* Terms */}
                        <div className="flex items-start mb-6 text-sm">
                            <input type="checkbox" id="terms" className="mt-1 mr-2" required />
                            <label htmlFor="terms" className="text-gray-600">
                                By signing up, you agree to our{" "}
                                <a href="/signup" className="text-[#00B4D8] hover:underline">
                                    Terms & Privacy Policy
                                </a>
                            </label>
                        </div>
                        {/* Submit */}
                        <button
                            type="button"
                            className="w-full bg-[#00B4D8] text-white py-2 rounded-lg shadow-md hover:bg-[#0097B2] focus:outline-none transition"
                            onClick={handleSignUp}
                        >
                            Create Account
                        </button>
                    </form>
                    <p className="text-center text-gray-500 mt-6">
                        Already have an account?{" "}
                        <a href="/signin" className="text-[#00B4D8] hover:underline">
                            Login
                        </a>
                    </p>
                </div>
            </div>

            {/* Right Section: Promotion */}
            <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center text-center bg-[#00B4D8] text-white p-8">
                <div className="max-w-md">
                    <h1 className="text-4xl font-bold mb-4">Welcome to Flowbite</h1>
                    <p className="mb-4 text-lg">
                        Millions of designers and agencies showcase their work on Flowbite
                        - the home of the world's best creative professionals.
                    </p>
                    <div className="bg-white text-[#00B4D8] rounded-lg p-6 shadow">
                        <p className="text-lg font-semibold">Over 15.7k Happy Customers</p>
                    </div>
                </div>

            </div>
        </div>
    </div>
    );

};

export default SignUp;