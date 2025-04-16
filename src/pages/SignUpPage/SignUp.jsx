import React from "react";

const SignUp = () => {
    return (
        <div className="flex flex-wrap p-6">
            {/* Registration Form Section */}
            <div className="w-full md:w-1/2 p-4">
                <h1 className="text-2xl font-bold mb-4">Your Best Work Starts Here</h1>
                <button className="bg-blue-500 text-white px-4 py-2 rounded mb-2 w-full">
                    Sign up with Google
                </button>
                <button className="bg-black text-white px-4 py-2 rounded mb-2 w-full">
                    Sign up with Apple
                </button>
                <p className="text-center my-4">or</p>
                <form>
                    <label className="block mb-4">
                        <p className="mb-2 font-medium">What should we call you?</p>
                        <input
                            type="text"
                            placeholder="e.g. Bonnie Green"
                            className="w-full border p-2 rounded"
                            required
                        />
                    </label>
                    <label className="block mb-4">
                        <p className="mb-2 font-medium">Your email</p>
                        <input
                            type="email"
                            placeholder="name@company.com"
                            className="w-full border p-2 rounded"
                            required
                        />
                    </label>
                    <label className="block mb-4">
                        <p className="mb-2 font-medium">Your password</p>
                        <input
                            type="password"
                            className="w-full border p-2 rounded"
                            required
                        />
                    </label>
                    <div className="flex items-center mb-4">
                        <input type="checkbox" id="terms" className="mr-2" required />
                        <label htmlFor="terms" className="text-sm">
                            By signing up, you agree to Flowbite's Terms of Use and Privacy Policy.
                        </label>
                    </div>
                    <div className="flex items-center mb-6">
                        <input type="checkbox" id="updates" className="mr-2" />
                        <label htmlFor="updates" className="text-sm">
                            Email me about product updates and resources.
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded w-full"
                    >
                        Create an account
                    </button>
                </form>
                <p className="text-center mt-4">
                    Already have an account? <a href="/login" className="text-blue-500">Login here</a>
                </p>
            </div>

            {/* Promotion Section */}
            <div className="w-full md:w-1/2 p-4 bg-gray-100 rounded">
                <h1 className="text-2xl font-bold mb-4">Flowbite</h1>
                <p className="mb-4">
                    Explore the world's leading design portfolios.
                </p>
                <p className="mb-4">
                    Millions of designers and agencies showcase their work on Flowbite - the home of the world's best creative professionals.
                </p>
                <p className="text-green-500 font-semibold">Over 15.7k Happy Customers</p>
            </div>
        </div>
    );
};

export default SignUp;