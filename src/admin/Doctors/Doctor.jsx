import React, { useState } from 'react';
import { Search, UserPlus, Filter, Trash2, Edit, MoreVertical, Star, Calendar } from 'lucide-react';
import { FaUserDoctor } from "react-icons/fa6";
import { CiBookmark } from "react-icons/ci";
import { HiMiniQueueList } from "react-icons/hi2";
import { CiLogout } from "react-icons/ci";
import { SiAmazonsimpleemailservice } from "react-icons/si";
import AddDoctorModal from '../../component/addDoctorModelComponent/AddDoctorModal.jsx'; // Import the AddDoctorModal component

// Sample doctor data
const doctorData = [
    {
        id: 1,
        name: 'Dr. Sarah Miller',
        email: 'sarah.miller@example.com',
        specialty: 'Cardiology',
        rating: 4.8,
        patients: 124,
        experience: '12 years',
        availability: 'Available',
        nextAvailable: '2025-04-21'
    },
    {
        id: 2,
        name: 'Dr. James Wilson',
        email: 'james.wilson@example.com',
        specialty: 'Neurology',
        rating: 4.9,
        patients: 98,
        experience: '15 years',
        availability: 'Available',
        nextAvailable: '2025-04-22'
    },
    {
        id: 3,
        name: 'Dr. Emma Thompson',
        email: 'emma.thompson@example.com',
        specialty: 'Pediatrics',
        rating: 4.7,
        patients: 156,
        experience: '8 years',
        availability: 'Unavailable',
        nextAvailable: '2025-04-25'
    },
    {
        id: 4,
        name: 'Dr. Michael Chen',
        email: 'michael.chen@example.com',
        specialty: 'Dermatology',
        rating: 4.5,
        patients: 87,
        experience: '6 years',
        availability: 'Available',
        nextAvailable: '2025-04-21'
    },
    {
        id: 5,
        name: 'Dr. Lisa Rodriguez',
        email: 'lisa.rodriguez@example.com',
        specialty: 'Orthopedics',
        rating: 4.6,
        patients: 112,
        experience: '10 years',
        availability: 'Available',
        nextAvailable: '2025-04-23'
    },
    {
        id: 6,
        name: 'Dr. Robert Johnson',
        email: 'robert.johnson@example.com',
        specialty: 'General Practice',
        rating: 4.4,
        patients: 201,
        experience: '14 years',
        availability: 'Available',
        nextAvailable: '2025-04-22'
    },
    {
        id: 7,
        name: 'Dr. Amanda Clark',
        email: 'amanda.clark@example.com',
        specialty: 'Psychiatry',
        rating: 4.9,
        patients: 78,
        experience: '11 years',
        availability: 'Unavailable',
        nextAvailable: '2025-04-29'
    },
    {
        id: 8,
        name: 'Dr. David Kim',
        email: 'david.kim@example.com',
        specialty: 'Ophthalmology',
        rating: 4.7,
        patients: 94,
        experience: '9 years',
        availability: 'Available',
        nextAvailable: '2025-04-24'
    },
];

export default function Doctor() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDoctors, setSelectedDoctors] = useState([]);
    const [specialtyFilter, setSpecialtyFilter] = useState('All');
    const [doctors, setDoctors] = useState(doctorData);
    const [isAddDoctorModalOpen, setIsAddDoctorModalOpen] = useState(false);

    const specialties = ['All', ...new Set(doctors.map(doctor => doctor.specialty))];

    const filteredDoctors = doctors.filter(doctor =>
        (doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (specialtyFilter === 'All' || doctor.specialty === specialtyFilter)
    );

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedDoctors(filteredDoctors.map(doctor => doctor.id));
        } else {
            setSelectedDoctors([]);
        }
    };

    const handleSelectDoctor = (doctorId) => {
        if (selectedDoctors.includes(doctorId)) {
            setSelectedDoctors(selectedDoctors.filter(id => id !== doctorId));
        } else {
            setSelectedDoctors([...selectedDoctors, doctorId]);
        }
    };

    const handleDeleteSelected = () => {
        setDoctors(doctors.filter(doctor => !selectedDoctors.includes(doctor.id)));
        setSelectedDoctors([]);
    };

    const handleAddDoctor = (newDoctor) => {
        setDoctors([...doctors, newDoctor]);
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
        }

        if (hasHalfStar) {
            stars.push(
                <div key="half" className="relative w-4 h-4">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <div className="absolute top-0 left-0 overflow-hidden w-2 h-4">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </div>
                </div>
            );
        }

        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
        }

        return <div className="flex items-center">{stars}</div>;
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
                    <div className="px-4 py-3 bg-gray-100 border-l-4 border-blue-500 flex items-center space-x-3 text-blue-600">
                        <FaUserDoctor className="w-5 h-5" />
                        <a href="/doctor"><span className="font-medium">Doctor</span></a>
                    </div>
                    <div className="px-4 py-3 flex items-center space-x-3 text-gray-600 hover:bg-gray-100">
                        <CiBookmark className="w-5 h-5" />
                        <a href="/appointment"><span>Appointment</span></a>
                    </div>
                    <div className="px-4 py-3 flex items-center space-x-3 text-gray-600 hover:bg-gray-100">
                        <HiMiniQueueList className="w-5 h-5" />
                        <span>Queue</span>
                    </div>
                    <div className="px-4 py-3 flex items-center space-x-3 text-gray-600 hover:bg-gray-100">
                        <SiAmazonsimpleemailservice className="w-5 h-5" />
                        <a href="/email"><span>Emails</span></a>
                    </div>
                    <div className="px-4 py-3 flex items-center space-x-3 text-gray-600 hover:bg-gray-100 absolute bottom-4">
                        <CiLogout className="w-5 h-5" />
                        <span>LogOut</span>
                    </div>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
                {/* Top Navigation */}
                <div className="flex justify-between items-center p-4">
                    <h1 className="text-2xl font-semibold text-gray-700">Doctor Management</h1>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
                            <input
                                type="text"
                                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Search doctors..."
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

                {/* Doctor Management Content */}
                <div className="p-6">
                    {/* Action Bar */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex space-x-2">
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-1 hover:bg-blue-700"
                                onClick={() => setIsAddDoctorModalOpen(true)}
                            >
                                <UserPlus className="w-5 h-5" />
                                <span>Add Doctor</span>
                            </button>
                            {selectedDoctors.length > 0 && (
                                <button
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center space-x-1 hover:bg-red-600"
                                    onClick={handleDeleteSelected}
                                >
                                    <Trash2 className="w-5 h-5" />
                                    <span>Delete Selected</span>
                                </button>
                            )}
                        </div>
                        <div className="flex space-x-2">
                            <select
                                className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
                                value={specialtyFilter}
                                onChange={(e) => setSpecialtyFilter(e.target.value)}
                            >
                                {specialties.map(specialty => (
                                    <option key={specialty} value={specialty}>{specialty}</option>
                                ))}
                            </select>
                            <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center space-x-1 bg-white">
                                <Filter className="w-5 h-5" />
                                <span>More Filters</span>
                            </button>
                        </div>
                    </div>

                    {/* Doctor Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredDoctors.map((doctor) => (
                            <div key={doctor.id} className="bg-white rounded-lg shadow overflow-hidden">
                                <div className="p-6">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center">
                                            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                                                {doctor.name.split(' ')[1] ? doctor.name.split(' ')[1][0] : doctor.name[0]}
                                            </div>
                                            <div className="ml-3">
                                                <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                                                <p className="text-sm text-blue-600">{doctor.specialty}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                checked={selectedDoctors.includes(doctor.id)}
                                                onChange={() => handleSelectDoctor(doctor.id)}
                                            />
                                            <button className="ml-2 text-gray-400 hover:text-gray-600">
                                                <MoreVertical className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                {renderStars(doctor.rating)}
                                                <span className="ml-1 text-sm text-gray-600">{doctor.rating}</span>
                                            </div>
                                            <span className="text-sm text-gray-600">{doctor.experience}</span>
                                        </div>
                                    </div>

                                    <div className="mt-4 grid grid-cols-2 gap-2">
                                        <div className="bg-gray-50 p-2 rounded">
                                            <p className="text-xs text-gray-500">Patients</p>
                                            <p className="text-sm font-medium">{doctor.patients}</p>
                                        </div>
                                        <div className="bg-gray-50 p-2 rounded">
                                            <p className="text-xs text-gray-500">Status</p>
                                            <p className={`text-sm font-medium ${doctor.availability === 'Available' ? 'text-green-600' : 'text-red-600'}`}>
                                                {doctor.availability}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4 border-t pt-4">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center text-gray-600">
                                                <Calendar className="w-4 h-4 mr-1" />
                                                <span className="text-sm">Next Available: {doctor.nextAvailable}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex space-x-2">

                                            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center space-x-1 hover:bg-blue-700">
                                                <a href="/doctor/schedule">
                                                <span>Schedule</span>
                                                </a>
                                            </button>

                                        <a href="/doctor/edit">
                                            <button
                                                className="px-4 py-2 border border-gray-300 rounded-lg flex items-center justify-center text-blue-600 hover:bg-gray-50"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                        </a>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredDoctors.length}</span> of <span className="font-medium">{doctors.length}</span> doctors
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
            </div>

            {/* Add Doctor Modal */}
            <AddDoctorModal
                isOpen={isAddDoctorModalOpen}
                onClose={() => setIsAddDoctorModalOpen(false)}
                onAddDoctor={handleAddDoctor}
            />
        </div>
    );
}