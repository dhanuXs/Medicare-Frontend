import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    const menuItems = [
        { path: '/dashboard', icon: '📊', label: 'Dashboard' },
        { path: '/users', icon: '👥', label: 'Users' },
        { path: '/products', icon: '📦', label: 'Products' },
        { path: '/orders', icon: '🛒', label: 'Orders' },
        { path: '/settings', icon: '⚙️', label: 'Settings' },
    ];

    return (
        <div className={`bg-gray-800 text-white transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                {!collapsed && <h1 className="text-xl font-bold">Admin Panel</h1>}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-1 rounded-full hover:bg-gray-700"
                >
                    {collapsed ? '→' : '←'}
                </button>
            </div>

            <nav className="mt-6">
                <ul>
                    {menuItems.map((item) => (
                        <li key={item.path} className="mb-2">
                            <Link
                                to={item.path}
                                className={`flex items-center px-4 py-3 ${
                                    location.pathname === item.path
                                        ? 'bg-blue-600'
                                        : 'hover:bg-gray-700'
                                } rounded-lg mx-2`}
                            >
                                <span className="text-xl">{item.icon}</span>
                                {!collapsed && <span className="ml-3">{item.label}</span>}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;