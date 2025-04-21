import React, { useState } from 'react';
import { Search, Calendar, Filter, Plus, CheckCircle, XCircle, Clock, MoreVertical } from 'lucide-react';
import { FaUserDoctor } from "react-icons/fa6";
import { CiBookmark } from "react-icons/ci";
import { HiMiniQueueList } from "react-icons/hi2";
import { CiLogout } from "react-icons/ci";
import {SiAmazonsimpleemailservice} from "react-icons/si";

// Sample appointment data
const appointmentData = [
    {
        id: 1,
        patientName: 'Emma Wilson',
        patientEmail: 'emma.wilson@example.com',
        patientPhone: '+1 (555) 123-4567',
        doctorName: 'Dr. Sarah Miller',
        specialty: 'Cardiology',
        date: '2025-04-21',
        time: '09:30 AM',
        status: 'Confirmed',
        type: 'Check-up'
    },
    {
        id: 2,
        patientName: 'John Smith',
        patientEmail: 'john.smith@example.com',
        patientPhone: '+1 (555) 987-6543',
        doctorName: 'Dr. James Wilson',
        specialty: 'Neurology',
        date: '2025-04-21',
        time: '11:00 AM',
        status: 'Pending',
        type: 'Consultation'
    },
    {
        id: 3,
        patientName: 'Michael Brown',
        patientEmail: 'michael.brown@example.com',
        patientPhone: '+1 (555) 456-7890',
        doctorName: 'Dr. David Kim',
        specialty: 'Ophthalmology',
        date: '2025-04-21',
        time: '02:15 PM',
        status: 'Completed',
        type: 'Follow-up'
    },
    {
        id: 4,
        patientName: 'Sophia Garcia',
        patientEmail: 'sophia.garcia@example.com',
        patientPhone: '+1 (555) 234-5678',
        doctorName: 'Dr. Emma Thompson',
        specialty: 'Pediatrics',
        date: '2025-04-22',
        time: '10:45 AM',
        status: 'Confirmed',
        type: 'Vaccination'
    },
    {
        id: 5,
        patientName: 'William Johnson',
        patientEmail: 'william.johnson@example.com',
        patientPhone: '+1 (555) 345-6789',
        doctorName: 'Dr. Robert Johnson',
        specialty: 'General Practice',
        date: '2025-04-22',
        time: '01:30 PM',
        status: 'Cancelled',
        type: 'Check-up'
    },
    {
        id: 6,
        patientName: 'Olivia Martinez',
        patientEmail: 'olivia.martinez@example.com',
        patientPhone: '+1 (555) 876-5432',
        doctorName: 'Dr. Lisa Rodriguez',
        specialty: 'Orthopedics',
        date: '2025-04-23',
        time: '11:15 AM',
        status: 'Confirmed',
        type: 'Rehabilitation'
    },
    {
        id: 7,
        patientName: 'James Taylor',
        patientEmail: 'james.taylor@example.com',
        patientPhone: '+1 (555) 789-0123',
        doctorName: 'Dr. Michael Chen',
        specialty: 'Dermatology',
        date: '2025-04-23',
        time: '03:00 PM',
        status: 'Pending',
        type: 'Skin Check'
    },
    {
        id: 8,
        patientName: 'Ava Anderson',
        patientEmail: 'ava.anderson@example.com',
        patientPhone: '+1 (555) 567-8901',
        doctorName: 'Dr. Amanda Clark',
        specialty: 'Psychiatry',
        date: '2025-04-24',
        time: '09:00 AM',
        status: 'Confirmed',
        type: 'Therapy'
    }
];

export default function Appointment() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [dateFilter, setDateFilter] = useState('');
    const [appointmentTypeFilter, setAppointmentTypeFilter] = useState('All');

    const statuses = ['All', 'Confirmed', 'Pending', 'Completed', 'Cancelled'];
    const appointmentTypes = ['All', 'Check-up', 'Consultation', 'Follow-up', 'Vaccination', 'Rehabilitation', 'Therapy', 'Skin Check'];

    const filteredAppointments = appointmentData.filter(appointment =>
        (appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.patientEmail.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === 'All' || appointment.status === statusFilter) &&
        (appointmentTypeFilter === 'All' || appointment.type === appointmentTypeFilter) &&
        (dateFilter === '' || appointment.date === dateFilter)
    );

    // Group appointments by date for the calendar view
    const appointmentsByDate = filteredAppointments.reduce((acc, appointment) => {
        if (!acc[appointment.date]) {
            acc[appointment.date] = [];
        }
        acc[appointment.date].push(appointment);
        return acc;
    }, {});

    // Get unique dates
    const dates = Object.keys(appointmentsByDate).sort();

    // Generate calendar days
    const today = new Date();
    const calendarDays = [];
    for (let i = 0; i < 7; i++) {
        const day = new Date(today);
        day.setDate(today.getDate() + i);
        const formattedDate = day.toISOString().split('T')[0];
        const dayName = day.toLocaleDateString('en-US', { weekday: 'short' });
        const dayNumber = day.getDate();
        const appointmentCount = (appointmentsByDate[formattedDate] || []).length;
        calendarDays.push({ date: formattedDate, dayName, dayNumber, appointmentCount });
    }

    const handleDateSelect = (date) => {
        setDateFilter(date === dateFilter ? '' : date);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Confirmed': return 'bg-green-100 text-green-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Completed': return 'bg-blue-100 text-blue-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Confirmed': return <CheckCircle className="w-4 h-4 text-green-600" />;
            case 'Pending': return <Clock className="w-4 h-4 text-yellow-600" />;
            case 'Completed': return <CheckCircle className="w-4 h-4 text-blue-600" />;
            case 'Cancelled': return <XCircle className="w-4 h-4 text-red-600" />;
            default: return null;
        }
    };

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
                    <div className="px-4 py-3 flex items-center space-x-3 text-gray-600 hover:bg-gray-100">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="7" height="7" />
                            <rect x="14" y="3" width="7" height="7" />
                            <rect x="3" y="14" width="7" height="7" />
                            <rect x="14" y="14" width="7" height="7" />
                        </svg>
                        <a href="/admin"><span>Dashboard</span></a>
                    </div>
                    <div className="px-4 py-3 flex items-center space-x-3 text-gray-600 hover:bg-gray-100">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        <a href="/user"><span>User</span></a>
                    </div>
                    <div className="px-4 py-3 flex items-center space-x-3 text-gray-600 hover:bg-gray-100">
                        <FaUserDoctor className="w-5 h-5" />
                        <a href="/doctor"><span>Doctor</span></a>
                    </div>
                    <div className="px-4 py-3 bg-gray-100 border-l-4 border-blue-500 flex items-center space-x-3 text-blue-600">
                        <CiBookmark className= "w-5 h-5"/>
                        <span className="font-medium">Appointment</span>
                    </div>
                    <div className="px-4 py-3 flex items-center space-x-3 text-gray-600 hover:bg-gray-100">
                        <HiMiniQueueList className= "w-5 h-5" />
                        <span>Queue</span>
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
                <div className="flex justify-between items-center p-4">
                    <h1 className="text-2xl font-semibold text-gray-700">Appointment Management</h1>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
                            <input
                                type="text"
                                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Search appointments..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
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

                {/* Calendar Strip */}
                <div className="p-6 pb-0">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-700">Upcoming Appointments</h2>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-1 hover:bg-blue-700">
                            <Plus className="w-5 h-5" />
                            <span>New Appointment</span>
                        </button>
                    </div>

                    <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
                        {calendarDays.map((day) => (
                            <div
                                key={day.date}
                                className={`flex-shrink-0 w-32 bg-white rounded-lg shadow p-4 cursor-pointer transition-all ${
                                    dateFilter === day.date ? 'border-2 border-blue-500 transform scale-105' : ''
                                }`}
                                onClick={() => handleDateSelect(day.date)}
                            >
                                <p className="text-sm text-gray-500 font-medium">{day.dayName}</p>
                                <p className="text-xl font-bold">{day.dayNumber}</p>
                                <div className="mt-2 flex items-center space-x-1">
                                    <Calendar className="w-4 h-4 text-blue-600" />
                                    <p className="text-sm text-blue-600">{day.appointmentCount} appointments</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Appointment List */}
                <div className="px-6">
                    {/* Filter Bar */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex space-x-2">
                            <select
                                className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                {statuses.map(status => (
                                    <option key={status} value={status}>{status} Status</option>
                                ))}
                            </select>
                            <select
                                className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
                                value={appointmentTypeFilter}
                                onChange={(e) => setAppointmentTypeFilter(e.target.value)}
                            >
                                {appointmentTypes.map(type => (
                                    <option key={type} value={type}>{type === 'All' ? 'All Types' : type}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <span className="text-sm font-medium mr-2">Showing {filteredAppointments.length} appointments</span>
                            <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
                                <Filter className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Appointments Table */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Patient Info
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Doctor
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Schedule
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Type
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {filteredAppointments.map((appointment) => (
                                <tr key={appointment.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 flex-shrink-0">
                                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                        <span className="text-blue-600 font-medium">
                                                            {appointment.patientName.split(' ').map(n => n[0]).join('')}
                                                        </span>
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{appointment.patientName}</div>
                                                <div className="text-sm text-gray-500">{appointment.patientEmail}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{appointment.doctorName}</div>
                                        <div className="text-sm text-gray-500">{appointment.specialty}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <Calendar className="w-4 h-4 text-gray-500 mr-1" />
                                            <div>
                                                <div className="text-sm text-gray-900">{new Date(appointment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                                                <div className="text-sm text-gray-500">{appointment.time}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{appointment.type}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                                                <span className="flex items-center">
                                                    {getStatusIcon(appointment.status)}
                                                    <span className="ml-1">{appointment.status}</span>
                                                </span>
                                            </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            <button className="p-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100">
                                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                </svg>
                                            </button>
                                            <button className="p-1 bg-red-50 text-red-600 rounded hover:bg-red-100">
                                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <polyline points="3 6 5 6 21 6"></polyline>
                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                </svg>
                                            </button>
                                            <button className="p-1 bg-gray-50 text-gray-600 rounded hover:bg-gray-100">
                                                <MoreVertical className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        {/* Empty State */}
                        {filteredAppointments.length === 0 && (
                            <div className="py-12 flex flex-col items-center justify-center">
                                <Calendar className="w-16 h-16 text-gray-300" />
                                <h3 className="mt-4 text-lg font-medium text-gray-900">No appointments found</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Try adjusting your search or filter to find what you're looking for.
                                </p>
                                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-1 hover:bg-blue-700">
                                    <Plus className="w-5 h-5" />
                                    <span>Create New Appointment</span>
                                </button>
                            </div>
                        )}

                        {/* Pagination */}
                        {filteredAppointments.length > 0 && (
                            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                                <div className="flex-1 flex justify-between sm:hidden">
                                    <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                        Previous
                                    </a>
                                    <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                        Next
                                    </a>
                                </div>
                                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredAppointments.length}</span> of <span className="font-medium">{filteredAppointments.length}</span> appointments
                                        </p>
                                    </div>
                                    <div>
                                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                            <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                                <span className="sr-only">Previous</span>
                                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </a>
                                            <a href="#" aria-current="page" className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                                                1
                                            </a>
                                            <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                                <span className="sr-only">Next</span>
                                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
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
        </div>
    );
}