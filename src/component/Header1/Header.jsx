import { useState } from 'react';

const Header = ({ title }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    return (
        <header className="bg-white shadow-sm z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* Search */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-64 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="absolute right-3 top-2.5">🔍</span>
                        </div>

                        {/* Notifications */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setIsNotificationsOpen(!isNotificationsOpen);
                                    if (isProfileOpen) setIsProfileOpen(false);
                                }}
                                className="p-2 rounded-full hover:bg-gray-100"
                            >
                                🔔
                            </button>

                            {isNotificationsOpen && (
                                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
                                    <div className="px-4 py-2 border-b border-gray-200">
                                        <h3 className="text-sm font-semibold">Notifications</h3>
                                    </div>
                                    <div className="max-h-64 overflow-y-auto">
                                        <div className="px-4 py-2 hover:bg-gray-100 border-b border-gray-100">
                                            <p className="text-sm">New user registered</p>
                                            <span className="text-xs text-gray-500">2 minutes ago</span>
                                        </div>
                                        <div className="px-4 py-2 hover:bg-gray-100 border-b border-gray-100">
                                            <p className="text-sm">New order received</p>
                                            <span className="text-xs text-gray-500">1 hour ago</span>
                                        </div>
                                        <div className="px-4 py-2 hover:bg-gray-100">
                                            <p className="text-sm">Server update completed</p>
                                            <span className="text-xs text-gray-500">2 hours ago</span>
                                        </div>
                                    </div>
                                    <div className="px-4 py-2 border-t border-gray-200">
                                        <button className="text-sm text-blue-600 hover:text-blue-800">
                                            View all notifications
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setIsProfileOpen(!isProfileOpen);
                                    if (isNotificationsOpen) setIsNotificationsOpen(false);
                                }}
                                className="flex items-center"
                            >
                                <img
                                    src="/api/placeholder/40/40"
                                    alt="Profile"
                                    className="h-8 w-8 rounded-full"
                                />
                                <span className="ml-2 text-gray-700">Admin User</span>
                                <span className="ml-1">▼</span>
                            </button>

                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
                                    <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Your Profile
                                    </a>
                                    <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Settings
                                    </a>
                                    <a href="#logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Sign out
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;