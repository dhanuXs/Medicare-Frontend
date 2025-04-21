import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import axios from "axios";

export default function UserUpdateForm() {
    // Get user from localStorage and parse it
    const userFromStorage = localStorage.getItem("userToEdit");
    const parsedUser = userFromStorage ? JSON.parse(userFromStorage) : null;

    // Define state at the component top level
    const [userData, setUserData] = useState({
        email: parsedUser?.email || '',
        name: parsedUser?.name || '',
        password: '',
        contactNumber: parsedUser?.contactNumber || '',
        imgUrl: parsedUser?.imgUrl || '',
        role: parsedUser?.role || 'Patient'
    });

    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(parsedUser?.imgUrl || null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Get user ID from URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const email = urlParams.get('email');

        if (email) {
            fetchUserData(email);
        }
    }, []);

    const fetchUserData = async (email) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:8080/api/v1/user/getUser/${email}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
                }
            });

            const user = response.data.data;
            setUserData({
                email: user.email || '',
                name: user.name || '',
                password: '', // Don't populate password for security
                contactNumber: user.contactNumber || '',
                imgUrl: user.imgUrl || '',
                role: user.role || 'Patient'
            });

            if (user.imgUrl) {
                setPreviewImage(user.imgUrl);
            }

            setLoading(false);
        } catch (err) {
            console.error("Error fetching user data:", err);
            setError("Failed to load user data. Please try again later.");
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);

            // Create preview
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadImageToGoogleDrive = async () => {
        if (!imageFile) return userData.imgUrl; // Return existing URL if no new file

        // Google Drive upload logic goes here
        // Currently commented out in original code
        return userData.imgUrl; // Return existing URL for now
    };

    const updateUser = async () => {
        try {
            setLoading(true);
            setError(null);

            // First upload image if available
            let imgUrl = userData.imgUrl;
            if (imageFile) {
                imgUrl = await uploadImageToGoogleDrive();
            }

            // Create user object with image URL if uploaded
            const userToUpdate = {
                ...userData,
                imgUrl: imgUrl
            };

            // Remove password if it's empty (user didn't want to change it)
            if (!userToUpdate.password) {
                delete userToUpdate.password;
            }

            // Send API request to update user
            const response = await axios.post(`http://localhost:8080/api/v1/user/update`, userToUpdate, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
                }
            });

            if (response.data) {
                alert('User updated successfully!');
                // Redirect to user listing page
                window.location.href = '/admin/users';
            } else {
                setError("Failed to update user. Please try again.");
            }
        } catch (err) {
            console.error("Error updating user:", err);
            setError(err.response?.data?.message || "Failed to update user. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const goBack = () => {
        window.location.href = '/user';
    };

    // Function to get user initials for avatar placeholder
    const getUserInitials = (name) => {
        if (!name) return "U";
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-6">
                {/* Top Navigation */}
                <div className="flex items-center mb-6">
                    <button
                        onClick={goBack}
                        className="mr-4 p-2 hover:bg-gray-100 rounded-full"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <h1 className="text-2xl font-semibold text-gray-700">Update User</h1>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
                    {loading && !error ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                        </div>
                    ) : error ? (
                        <div className="bg-red-100 text-red-700 p-4 mb-6 rounded-lg">
                            {error}
                        </div>
                    ) : (
                        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                            {/* Profile Image Section */}
                            <div className="flex flex-col items-center mb-6">
                                <div className="mb-4">
                                    {previewImage ? (
                                        <img
                                            src={previewImage}
                                            alt="Profile Preview"
                                            className="h-32 w-32 rounded-full object-cover border-4 border-gray-200"
                                        />
                                    ) : (
                                        <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-200">
                                            <span className="text-gray-600 text-3xl font-medium">
                                                {getUserInitials(userData.name)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label
                                        htmlFor="imgUrl"
                                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg cursor-pointer text-sm font-medium"
                                    >
                                        Change Image
                                    </label>
                                    <input
                                        type="file"
                                        id="imgUrl"
                                        name="imgUrl"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </div>
                                {imageFile && (
                                    <div className="mt-2 text-sm text-gray-500">
                                        {imageFile.name}
                                    </div>
                                )}
                            </div>

                            {/* Form Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={userData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={userData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                        Password (Leave blank to keep current)
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={userData.password}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                        Contact Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="contactNumber"
                                        name="contactNumber"
                                        value={userData.contactNumber}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                                        Role
                                    </label>
                                    <select
                                        id="role"
                                        name="role"
                                        value={userData.role}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="PATIENT">Patient</option>
                                        <option value="DOCTOR">Doctor</option>
                                        <option value="ADMIN">Admin</option>
                                        <option value="USER">User</option>
                                    </select>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end space-x-3 pt-6 border-t">
                                <button
                                    type="button"
                                    onClick={goBack}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={updateUser}
                                    disabled={loading}
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    {loading ? 'Updating...' : 'Update User'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}