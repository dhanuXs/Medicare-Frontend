import React, { useEffect, useState } from 'react';
import { UsersIcon, Search, UserPlus, Filter, Trash2, Edit, MoreVertical, X } from 'lucide-react';
import { FaUserDoctor } from "react-icons/fa6";
import { CiBookmark } from "react-icons/ci";
import { HiMiniQueueList } from "react-icons/hi2";
import { CiLogout } from "react-icons/ci";
import { SiAmazonsimpleemailservice } from "react-icons/si";
import axios from "axios";
import {imgDb} from "../../util/Firebase/Config.js"
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import {v4} from 'uuid';

export default function User() {
    const [userData, setUserData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        contactNumber: '',
        imgUrl: '',
        role: 'Patient',
        status: 'Active'
    });
    const [imageFile, setImageFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    // Fetch user data from API
    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8080/api/v1/user/getAll',
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
                    }
                });

            // Map the API response to match our table structure
            const formattedUsers = response.data.data.map((user, index) => ({
                id: user.id || index + 1,
                name: user.name || 'Unknown',
                email: user.email || 'No email',
                role: user.role || 'Patient',
                contactNumber: user.contactNumber || 'Not provided',
                imgUrl: user.imgUrl || '',
                status: user.status || 'Active', // Default status if not provided
                lastLogin: user.lastLogin || 'Never'
            }));

            setUserData(formattedUsers);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching user data:", err);
            setError("Failed to load user data. Please try again later.");
            setLoading(false);
        }
    };
    const saveNewUser =async () =>{
        let axiosResponse = await axios.post(`http://localhost:8080/api/v1/user/register`,newUser,
            {
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
                }
            });
        if(axiosResponse != null){
            alert("User Saved!")
        } else {
            alert("Error!")
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const filteredUsers = userData.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedUsers(filteredUsers.map(user => user.id));
        } else {
            setSelectedUsers([]);
        }
    };

    const handleSelectUser = (userId) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter(id => id !== userId));
        } else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    };

    // Function to get user initials for avatar
    const getUserInitials = (name) => {
        if (!name) return "U";
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    // Handle file input change
    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    // Handle input change for new user form
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewUser({
            ...newUser,
            [name]: value
        });
    };

    // Upload image to Firebase Storage
    const uploadImage = async () => {
        if (!imageFile) return null;

        try {
            // Create a unique file name
            const fileName = `${v4()}_${imageFile.name}`;
            const imageRef = ref(imgDb, `profile_images/${fileName}`);

            // Upload the file
            const snapshot = await uploadBytes(imageRef, imageFile);

            // Get the download URL
            const downloadURL = await getDownloadURL(snapshot.ref);

            return downloadURL;
        } catch (error) {
            console.error("Error uploading image:", error);
            throw new Error("Failed to upload image. Please try again.");
        }
    };

    // Handle form submission for creating a new user
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);
        setSubmitError(null);

        try {
            // First upload image if available
            let imgUrl = '';
            if (imageFile) {
                imgUrl = await uploadImage();
            }

            // Create user object with image URL if uploaded
            const userToCreate = {
                ...newUser,
                imgUrl: imgUrl || newUser.imgUrl
            };

            // Send API request to create user
            await axios.post('http://localhost:8080/api/v1/user/create', userToCreate, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
                }
            });

            // Reset form and close modal
            setNewUser({
                name: '',
                email: '',
                password: '',
                contactNumber: '',
                imgUrl: '',
                role: 'Patient',
                status: 'Active'
            });
            setImageFile(null);
            setIsModalOpen(false);

            // Refresh user list
            fetchUsers();
        } catch (err) {
            console.error("Error creating user:", err);
            setSubmitError(err.response?.data?.message || "Failed to create user. Please try again.");
        } finally {
            setSubmitLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md">
                <div className="p-4 bg-gray-100 rounded-md m-4 flex items-center space-x-3">
                    <div
                        className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold">
                        JF
                    </div>
                    <div>
                        <p className="font-medium">Jaydon Frankie</p>
                    </div>
                </div>
                <nav className="mt-4">
                    <div className="px-4 py-3 flex items-center space-x-3 text-gray-600 hover:bg-gray-100">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="7" height="7"/>
                            <rect x="14" y="3" width="7" height="7"/>
                            <rect x="3" y="14" width="7" height="7"/>
                            <rect x="14" y="14" width="7" height="7"/>
                        </svg>
                        <a href="/admin"><span>Dashboard</span></a>
                    </div>
                    <div
                        className="px-4 py-3 bg-gray-100 border-l-4 border-blue-500 flex items-center space-x-3 text-blue-600">
                        <UsersIcon className="w-5 h-5"/>
                        <span className="font-medium">User</span>
                    </div>
                    <div className="px-4 py-3 flex items-center space-x-3 text-gray-600 hover:bg-gray-100">
                        <FaUserDoctor className="w-5 h-5"/>
                        <span>Doctor</span>
                    </div>
                    <div className="px-4 py-3 flex items-center space-x-3 text-gray-600 hover:bg-gray-100">
                        <CiBookmark className="w-5 h-5"/>
                        <span>Appointment</span>
                    </div>
                    <div className="px-4 py-3 flex items-center space-x-3 text-gray-600 hover:bg-gray-100">
                        <HiMiniQueueList className="w-5 h-5"/>
                        <span>Queue</span>
                    </div>
                    <div className="px-4 py-3 flex items-center space-x-3 text-gray-600 hover:bg-gray-100">
                        <SiAmazonsimpleemailservice className="w-5 h-5"/>
                        <a href="/email"><span>Emails</span></a>
                    </div>
                    <div
                        className="px-4 py-3 flex items-center space-x-3 text-gray-600 hover:bg-gray-100 absolute bottom-4">
                        <CiLogout className="w-5 h-5"/>
                        <span>LogOut</span>
                    </div>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
                {/* Top Navigation */}
                <div className="flex justify-between items-center p-4">
                    <h1 className="text-2xl font-semibold text-gray-700">User Management</h1>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400"/>
                            <input
                                type="text"
                                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="relative">
                                <button className="p-2 bg-gray-100 rounded-full">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                         strokeWidth="2">
                                        <path
                                            d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
                                    </svg>
                                    <span
                                        className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">2</span>
                                </button>
                            </div>
                            <div
                                className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold">
                                JF
                            </div>
                        </div>
                    </div>
                </div>

                {/* User Management Content */}
                <div className="p-6">
                    {/* Action Bar */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex space-x-2">
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-1 hover:bg-blue-700"
                                onClick={() => setIsModalOpen(true)}
                            >
                                <UserPlus className="w-5 h-5"/>
                                <span>Add User</span>
                            </button>
                            {selectedUsers.length > 0 && (
                                <button
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center space-x-1 hover:bg-red-600">
                                    <Trash2 className="w-5 h-5"/>
                                    <span>Delete Selected</span>
                                </button>
                            )}
                        </div>
                        <button
                            className="px-4 py-2 border border-gray-300 rounded-lg flex items-center space-x-1 bg-white">
                            <Filter className="w-5 h-5"/>
                            <span>Filter</span>
                        </button>
                    </div>

                    {/* User Table */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                            </div>
                        ) : error ? (
                            <div className="flex justify-center items-center h-64 text-red-500">{error}</div>
                        ) : (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            onChange={handleSelectAll}
                                            checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                                        />
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Role
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Contact
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Last Login
                                    </th>
                                    <th scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                checked={selectedUsers.includes(user.id)}
                                                onChange={() => handleSelectUser(user.id)}
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 flex-shrink-0">
                                                    {user.imgUrl ? (
                                                        <img
                                                            src={user.imgUrl}
                                                            alt={user.name}
                                                            className="h-10 w-10 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <div
                                                            className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                                            <span className="text-gray-600 font-medium">
                                                                {getUserInitials(user.name)}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{user.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{user.role}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{user.contactNumber}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                ${user.status === 'Active' ? 'bg-green-100 text-green-800' :
                                                user.status === 'Inactive' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'}`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {user.lastLogin}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <a href="/user/edit">
                                                    <button className="text-blue-600 hover:text-blue-900">
                                                        <Edit className="w-5 h-5"/>
                                                    </button>
                                                </a>
                                                <button className="text-gray-400 hover:text-gray-600">
                                                    <MoreVertical className="w-5 h-5"/>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        )}

                        {/* Pagination */}
                        {!loading && !error && (
                            <div
                                className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                                <div className="flex-1 flex justify-between sm:hidden">
                                    <a href="#"
                                       className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                        Previous
                                    </a>
                                    <a href="#"
                                       className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                        Next
                                    </a>
                                </div>
                                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            Showing <span className="font-medium">1</span> to <span
                                            className="font-medium">{filteredUsers.length}</span> of <span
                                            className="font-medium">{userData.length}</span> results
                                        </p>
                                    </div>
                                    <div>
                                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                                             aria-label="Pagination">
                                            <a href="#"
                                               className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                                <span className="sr-only">Previous</span>
                                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd"
                                                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                          clipRule="evenodd"/>
                                                </svg>
                                            </a>
                                            <a href="#" aria-current="page"
                                               className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                                                1
                                            </a>
                                            <a href="#"
                                               className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                                <span className="sr-only">Next</span>
                                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd"
                                                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                          clipRule="evenodd"/>
                                                </svg>
                                            </a>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add User Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                        <div className="flex justify-between items-center p-6 border-b">
                            <h3 className="text-lg font-medium text-gray-900">Add New User</h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <X className="w-5 h-5"/>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                            {submitError && (
                                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                                    {submitError}
                                </div>
                            )}

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={newUser.name}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={newUser.email}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={newUser.password}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
                                        Contact Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="contactNumber"
                                        name="contactNumber"
                                        value={newUser.contactNumber}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">
                                        Profile Image
                                    </label>
                                    <input
                                        type="file"
                                        id="profileImage"
                                        accept="user/*"
                                        onChange={handleFileChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    {imageFile && (
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">Selected file: {imageFile.name}</p>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                        Role
                                    </label>
                                    <select
                                        id="role"
                                        name="role"
                                        value={newUser.role}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                    >
                                        <option value="Patient">Patient</option>
                                        <option value="Doctor">Doctor</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Staff">Staff</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                                        Status
                                    </label>
                                    <select
                                        id="status"
                                        name="status"
                                        value={newUser.status}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                        <option value="Pending">Pending</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={saveNewUser}
                                    disabled={submitLoading}
                                    className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                                        submitLoading ? 'opacity-70 cursor-not-allowed' : ''
                                    }`}
                                >
                                    {submitLoading ? 'Creating...' : 'Create User'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}