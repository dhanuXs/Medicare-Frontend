import React, { useState } from 'react';
import { Search, Calendar, Filter, Plus, CheckCircle, XCircle, Clock, MoreVertical, UserPlus, ChevronRight, SkipForward } from 'lucide-react';
import { FaUserDoctor } from "react-icons/fa6";
import { CiBookmark } from "react-icons/ci";
import { HiMiniQueueList } from "react-icons/hi2";
import { CiLogout } from "react-icons/ci";
import {SiAmazonsimpleemailservice} from "react-icons/si";

// Sample queue data
const queueData = [
    {
        id: 101,
        patientName: 'Emma Wilson',
        patientEmail: 'emma.wilson@example.com',
        patientPhone: '+1 (555) 123-4567',
        doctorName: 'Dr. Sarah Miller',
        specialty: 'Cardiology',
        queueNumber: 1,
        estimatedTime: '10:15 AM',
        waitingTime: '15 min',
        status: 'In Progress',
        priority: 'Normal'
    },
    {
        id: 102,
        patientName: 'John Smith',
        patientEmail: 'john.smith@example.com',
        patientPhone: '+1 (555) 987-6543',
        doctorName: 'Dr. James Wilson',
        specialty: 'Neurology',
        queueNumber: 2,
        estimatedTime: '10:30 AM',
        waitingTime: '30 min',
        status: 'Waiting',
        priority: 'Normal'
    },
    {
        id: 103,
        patientName: 'Sophia Garcia',
        patientEmail: 'sophia.garcia@example.com',
        patientPhone: '+1 (555) 234-5678',
        doctorName: 'Dr. Sarah Miller',
        specialty: 'Cardiology',
        queueNumber: 3,
        estimatedTime: '10:45 AM',
        waitingTime: '45 min',
        status: 'Waiting',
        priority: 'Normal'
    },
    {
        id: 104,
        patientName: 'Michael Brown',
        patientEmail: 'michael.brown@example.com',
        patientPhone: '+1 (555) 456-7890',
        doctorName: 'Dr. David Kim',
        specialty: 'Ophthalmology',
        queueNumber: 1,
        estimatedTime: '10:15 AM',
        waitingTime: '15 min',
        status: 'In Progress',
        priority: 'Normal'
    },
    {
        id: 105,
        patientName: 'William Johnson',
        patientEmail: 'william.johnson@example.com',
        patientPhone: '+1 (555) 345-6789',
        doctorName: 'Dr. Robert Johnson',
        specialty: 'General Practice',
        queueNumber: 2,
        estimatedTime: '10:30 AM',
        waitingTime: '30 min',
        status: 'Waiting',
        priority: 'Urgent'
    },
    {
        id: 106,
        patientName: 'Olivia Martinez',
        patientEmail: 'olivia.martinez@example.com',
        patientPhone: '+1 (555) 876-5432',
        doctorName: 'Dr. Lisa Rodriguez',
        specialty: 'Orthopedics',
        queueNumber: 1,
        estimatedTime: '10:15 AM',
        waitingTime: '15 min',
        status: 'In Progress',
        priority: 'Normal'
    }
];

// Group queue by doctor
const queueByDoctor = queueData.reduce((acc, patient) => {
    if (!acc[patient.doctorName]) {
        acc[patient.doctorName] = [];
    }
    acc[patient.doctorName].push(patient);
    return acc;
}, {});

export default function PatientQueue() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [doctorFilter, setDoctorFilter] = useState('All');

    const statuses = ['All', 'In Progress', 'Waiting', 'Completed', 'Cancelled'];
    const doctors = ['All', ...Object.keys(queueByDoctor)];

    const filteredQueue = queueData.filter(patient =>
        (patient.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.patientEmail.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === 'All' || patient.status === statusFilter) &&
        (doctorFilter === 'All' || patient.doctorName === doctorFilter)
    );

    // Sort by queue number
    const sortedQueue = [...filteredQueue].sort((a, b) => {
        // First by doctor
        if (a.doctorName !== b.doctorName) {
            return a.doctorName.localeCompare(b.doctorName);
        }
        // Then by priority (Urgent first)
        if (a.priority !== b.priority) {
            return a.priority === 'Urgent' ? -1 : 1;
        }
        // Then by queue number
        return a.queueNumber - b.queueNumber;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'In Progress': return 'bg-blue-100 text-blue-800';
            case 'Waiting': return 'bg-yellow-100 text-yellow-800';
            case 'Completed': return 'bg-green-100 text-green-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'In Progress': return <Clock className="w-4 h-4 text-blue-600" />;
            case 'Waiting': return <Clock className="w-4 h-4 text-yellow-600" />;
            case 'Completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
            case 'Cancelled': return <XCircle className="w-4 h-4 text-red-600" />;
            default: return null;
        }
    };

    const getPriorityBadge = (priority) => {
        if (priority === 'Urgent') {
            return <span className="px-2 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded-full ml-2">Urgent</span>;
        }
        return null;
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
                    <div className="px-4 py-3 flex items-center space-x-3 text-gray-600 hover:bg-gray-100">
                        <CiBookmark className= "w-5 h-5"/>
                        <a href="/appointment"><span>Appointment</span></a>
                    </div>
                    <div className="px-4 py-3 bg-gray-100 border-l-4 border-blue-500 flex items-center space-x-3 text-blue-600">
                        <HiMiniQueueList className= "w-5 h-5" />
                        <span className="font-medium">Queue</span>
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
                    <h1 className="text-2xl font-semibold text-gray-700">Patient Queue Management</h1>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
                            <input
                                type="text"
                                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Search patients..."
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

                {/* Queue Summary */}
                <div className="p-6 pb-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-700">Current Queue Status</h2>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-1 hover:bg-blue-700">
                            <UserPlus className="w-5 h-5" />
                            <span>Add Patient to Queue</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white rounded-lg shadow p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Total In Queue</p>
                                    <p className="text-3xl font-bold text-gray-800">
                                        {queueData.filter(q => q.status === 'Waiting' || q.status === 'In Progress').length}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <HiMiniQueueList className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                            <div className="mt-4 flex justify-between items-center">
                                <span className="text-sm text-gray-500">Average wait: 25 min</span>
                                <span className="text-sm text-blue-600">View details</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">In Progress</p>
                                    <p className="text-3xl font-bold text-blue-600">
                                        {queueData.filter(q => q.status === 'In Progress').length}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Clock className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                            <div className="mt-4 flex justify-between items-center">
                                <span className="text-sm text-gray-500">Currently being seen</span>
                                <span className="text-sm text-blue-600">View details</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Urgent Cases</p>
                                    <p className="text-3xl font-bold text-red-600">
                                        {queueData.filter(q => q.priority === 'Urgent').length}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                        <line x1="12" y1="9" x2="12" y2="13"></line>
                                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                                    </svg>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-between items-center">
                                <span className="text-sm text-gray-500">Priority patients</span>
                                <span className="text-sm text-red-600">View details</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Queue List */}
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
                                value={doctorFilter}
                                onChange={(e) => setDoctorFilter(e.target.value)}
                            >
                                {doctors.map(doctor => (
                                    <option key={doctor} value={doctor}>{doctor === 'All' ? 'All Doctors' : doctor}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <span className="text-sm font-medium mr-2">Showing {sortedQueue.length} patients in queue</span>
                            <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
                                <Filter className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Queue Table */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Queue No.
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Patient Info
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Doctor
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Estimated Time
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Waiting Time
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
                            {sortedQueue.map((patient) => (
                                <tr key={patient.id} className={`hover:bg-gray-50 ${patient.priority === 'Urgent' ? 'bg-red-50' : ''}`}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                <span className="text-blue-600 font-medium">{patient.queueNumber}</span>
                                            </div>
                                            {getPriorityBadge(patient.priority)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 flex-shrink-0">
                                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                        <span className="text-blue-600 font-medium">
                                                            {patient.patientName.split(' ').map(n => n[0]).join('')}
                                                        </span>
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{patient.patientName}</div>
                                                <div className="text-sm text-gray-500">{patient.patientEmail}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{patient.doctorName}</div>
                                        <div className="text-sm text-gray-500">{patient.specialty}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <Clock className="w-4 h-4 text-gray-500 mr-1" />
                                            <div className="text-sm text-gray-900">{patient.estimatedTime}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{patient.waitingTime}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(patient.status)}`}>
                                                <span className="flex items-center">
                                                    {getStatusIcon(patient.status)}
                                                    <span className="ml-1">{patient.status}</span>
                                                </span>
                                            </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-2">
                                            {patient.status === 'Waiting' && (
                                                <button className="p-1 bg-green-50 text-green-600 rounded hover:bg-green-100" title="Call Next">
                                                    <ChevronRight className="w-5 h-5" />
                                                </button>
                                            )}
                                            {patient.status === 'In Progress' && (
                                                <button className="p-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100" title="Complete">
                                                    <CheckCircle className="w-5 h-5" />
                                                </button>
                                            )}
                                            <button className="p-1 bg-yellow-50 text-yellow-600 rounded hover:bg-yellow-100" title="Skip">
                                                <SkipForward className="w-5 h-5" />
                                            </button>
                                            <button className="p-1 bg-red-50 text-red-600 rounded hover:bg-red-100" title="Remove">
                                                <XCircle className="w-5 h-5" />
                                            </button>
                                            <button className="p-1 bg-gray-50 text-gray-600 rounded hover:bg-gray-100" title="More Options">
                                                <MoreVertical className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        {/* Empty State */}
                        {sortedQueue.length === 0 && (
                            <div className="py-12 flex flex-col items-center justify-center">
                                <HiMiniQueueList className="w-16 h-16 text-gray-300" />
                                <h3 className="mt-4 text-lg font-medium text-gray-900">No patients in queue</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    The patient queue is currently empty.
                                </p>
                                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-1 hover:bg-blue-700">
                                    <UserPlus className="w-5 h-5" />
                                    <span>Add Patient to Queue</span>
                                </button>
                            </div>
                        )}

                        {/* Pagination */}
                        {sortedQueue.length > 0 && (
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
                                            Showing <span className="font-medium">1</span> to <span className="font-medium">{sortedQueue.length}</span> of <span className="font-medium">{sortedQueue.length}</span> patients
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