import React from 'react';
import { PieChart, Pie, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Bug, Users, LogIn, AlertCircle, Search } from 'lucide-react';
import { FaUserDoctor } from "react-icons/fa6";
import {CiBookmark} from "react-icons/ci";
import {HiMiniQueueList} from "react-icons/hi2";
import { CiLogout } from "react-icons/ci";
import {SiAmazonsimpleemailservice} from "react-icons/si";

// Sample data for charts
const lineData = [
    { name: 'Jan', TeamA: 30, TeamB: 40, TeamC: 28 },
    { name: 'Feb', TeamA: 10, TeamB: 53, TeamC: 35 },
    { name: 'Mar', TeamA: 25, TeamB: 40, TeamC: 45 },
    { name: 'Apr', TeamA: 15, TeamB: 35, TeamC: 50 },
    { name: 'May', TeamA: 22, TeamB: 65, TeamC: 38 },
    { name: 'Jun', TeamA: 18, TeamB: 45, TeamC: 55 },
    { name: 'Jul', TeamA: 35, TeamB: 40, TeamC: 50 },
    { name: 'Aug', TeamA: 20, TeamB: 42, TeamC: 45 },
    { name: 'Sep', TeamA: 45, TeamB: 40, TeamC: 35 },
    { name: 'Oct', TeamA: 30, TeamB: 38, TeamC: 40 },
    { name: 'Nov', TeamA: 28, TeamB: 42, TeamC: 35 },
];

const pieData = [
    { name: 'America', value: 27.7, fill: '#3366FF' },
    { name: 'Asia', value: 34.7, fill: '#36A3FF' },
    { name: 'Europe', value: 9.2, fill: '#FFCC00' },
    { name: 'Africa', value: 28.4, fill: '#FF5C5C' },
];

export default function Dashboard() {
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md">
                <div className="p-4 bg-gray-100 rounded-md m-4 flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold">
                        JF
                    </div>
                    <div>
                        <p className="font-medium">Jaydon Frankie</p>
                    </div>
                </div>
                <nav className="mt-4">
                    <div className="px-4 py-3 bg-gray-100 border-l-4 border-blue-500 flex items-center space-x-3 text-blue-600">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="7" height="7" />
                            <rect x="14" y="3" width="7" height="7" />
                            <rect x="3" y="14" width="7" height="7" />
                            <rect x="14" y="14" width="7" height="7" />
                        </svg>
                        <span className="font-medium">Dashboard</span>
                    </div>
                    <div className="px-4 py-3 flex items-center space-x-3 text-gray-600 hover:bg-gray-100">
                        <Users className="w-5 h-5" />
                        <a href="/user"><span>User</span></a>

                    </div>
                    <div className="px-4 py-3 flex items-center space-x-3 text-gray-600 hover:bg-gray-100">
                        <FaUserDoctor className="w-5 h-5" />
                        <a href="/doctor"><span>Doctor</span></a>
                    </div>
                    <div className="px-4 py-3 flex items-center space-x-3 text-gray-600 hover:bg-gray-100">
                        <CiBookmark className= "w-5 h-5"/>
                        <a href="/appointment"><span>Appointment</span></a>
                    </div>
                    <div className="px-4 py-3 flex items-center space-x-3 text-gray-600 hover:bg-gray-100">
                        <HiMiniQueueList className= "w-5 h-5" />
                        <a href="/queue"><span>Queue</span></a>
                    </div>
                    <div className="px-4 py-3 flex items-center space-x-3 text-gray-600 hover:bg-gray-100">
                        <SiAmazonsimpleemailservice className= "w-5 h-5"/>
                        <a href="/email"><span>Emails</span></a>
                    </div>
                    <div className="px-4 py-3 flex items-center space-x-3 text-gray-600 hover:bg-gray-100 absolute bottom-4">
                        <CiLogout className= "w-5 h-5" />
                        <span>LogOut</span>
                    </div>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
                {/* Top Navigation */}
                <div className="flex justify-between items-center p-4 ">
                    <h1 className="text-2xl font-semibold text-gray-700">Hi, Welcome back</h1>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
                            <input type="text" className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Search..." />
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="relative">
                                <button className="p-2 bg-gray-100 rounded-full">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                                    </svg>
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">2</span>
                                </button>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold">
                                JF
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6 grid grid-cols-1 gap-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Android Stats */}
                        <div className="bg-blue-100 p-6 rounded-lg">
                            <div className="bg-blue-200 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-blue-800" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.523 15.384a.5.5 0 00-.491.5v1.975a.5.5 0 01-.5.5h-9.062a.5.5 0 01-.5-.5v-1.975a.5.5 0 00-.992 0v1.975a1.5 1.5 0 001.493 1.493h9.062a1.5 1.5 0 001.49-1.493v-1.975a.5.5 0 00-.5-.5z"/>
                                    <path d="M12.25 16.735a.5.5 0 00.5-.5V11.88l1.242 1.242a.5.5 0 00.707-.707l-2.095-2.095a.5.5 0 00-.707 0L9.8 12.415a.5.5 0 00.707.707l1.242-1.242v4.355a.5.5 0 00.5.5z"/>
                                    <path d="M7.885 5.136c-.34.34-.532.803-.532 1.287v2.832a.5.5 0 001 0V6.423c0-.203.08-.398.224-.541.145-.145.34-.224.543-.224h6.762c.203 0 .398.08.541.224.145.143.224.338.224.541v2.832a.5.5 0 101 0V6.423c0-.484-.191-.946-.532-1.287-.341-.34-.803-.532-1.287-.532H9.173c-.484 0-.946.191-1.288.532z"/>
                                </svg>
                            </div>
                            <h2 className="text-4xl font-bold text-gray-800">714k</h2>
                            <p className="text-gray-600 mt-1">Weekly Sales</p>
                        </div>

                        {/* Apple Stats */}
                        <div className="bg-blue-50 p-6 rounded-lg">
                            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.71 19.5c-.83 1.2-1.16 1.9-2.17 1.9-1.0.03-1.31-.56-2.5-.56-1.19 0-1.42.53-2.33.56-1.0.03-1.58-.87-2.17-1.89-.84-1.5-1.48-4.2-1.08-6.03.38-1.66 1.43-2.8 2.44-3.16.52-.19 1.2-.33 1.79-.33.76 0 1.37.33 1.98.33.57 0 1.2-.33 1.95-.33.78 0 1.59.19 2.16.47 1.4.62 1.84 2.03 1.84 2.03-.03.03-2.41.73-2.38 3.06 0 1.78 1.44 2.78 1.47 2.78-.61 1.33-.71 1.44-1 2.07zM15.12 3.36c.7-.83 1.17-1.99 1.14-3.36-.85.03-1.93.56-2.56 1.33-.55.66-1.03 1.71-1.03 3.3.94.03 1.93-.55 2.45-1.27z" />
                                </svg>
                            </div>
                            <h2 className="text-4xl font-bold text-gray-800">1.35m</h2>
                            <p className="text-gray-600 mt-1">New Users</p>
                        </div>

                        {/* Windows Stats */}
                        <div className="bg-yellow-50 p-6 rounded-lg">
                            <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-yellow-600" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3 5.3V18.7L10.3 20V12.7H3V5.3L10.3 4V11.3H17.7V3L3 5.3zM17.7 13.3V21L24 19.7V13L17.7 13.3z" />
                                </svg>
                            </div>
                            <h2 className="text-4xl font-bold text-gray-800">1.72m</h2>
                            <p className="text-gray-600 mt-1">Item Orders</p>
                        </div>

                        {/* Bug Stats */}
                        <div className="bg-red-50 p-6 rounded-lg">
                            <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                                <Bug className="w-6 h-6 text-red-600" />
                            </div>
                            <h2 className="text-4xl font-bold text-gray-800">234</h2>
                            <p className="text-gray-600 mt-1">Bug Reports</p>
                        </div>
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold">Website Visits</h3>
                                    <p className="text-sm text-gray-500">(+43%) than last year</p>
                                </div>
                            </div>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={lineData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="TeamA" stroke="#3366FF" activeDot={{ r: 8 }} />
                                    <Line type="monotone" dataKey="TeamB" stroke="#FFCC00" />
                                    <Line type="monotone" dataKey="TeamC" stroke="#36A3FF" />
                                    <Bar dataKey="TeamA" fill="#3366FF" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold">Current Visits</h3>
                                </div>
                            </div>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        dataKey="value"
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                                    />
                                    <Legend />
                                    <Tooltip formatter={(value) => `${value}%`} />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="grid grid-cols-2 gap-2 mt-4">
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-blue-600 mr-2"></div>
                                    <span className="text-sm">America</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                                    <span className="text-sm">Asia</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                                    <span className="text-sm">Europe</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                                    <span className="text-sm">Africa</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}