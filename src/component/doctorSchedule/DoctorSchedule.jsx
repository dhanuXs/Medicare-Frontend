import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Calendar,
    Clock,
    User,
    Plus,
    X,
    CheckCircle,
    XCircle,
    MessageSquare,
    Filter
} from 'lucide-react';

export default function DoctorSchedule() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [doctor, setDoctor] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [showAddAppointment, setShowAddAppointment] = useState(false);
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('all');
    const [dates, setDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [patientName, setPatientName] = useState('');
    const [patientEmail, setPatientEmail] = useState('');
    const [patientPhone, setPatientPhone] = useState('');
    const [appointmentType, setAppointmentType] = useState('');
    const [appointmentNotes, setAppointmentNotes] = useState('');

    // Generate time slots from 9 AM to 5 PM
    const timeSlots = Array.from({ length: 16 }, (_, i) => {
        const hour = Math.floor(i / 2) + 9;
        const minute = i % 2 === 0 ? '00' : '30';
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour > 12 ? hour - 12 : hour;
        return `${formattedHour}:${minute} ${ampm}`;
    });

    // Generate next 7 days for date selection
    useEffect(() => {
        const generateDates = () => {
            const today = new Date();
            const nextDays = Array.from({ length: 14 }, (_, i) => {
                const date = new Date();
                date.setDate(today.getDate() + i);
                return {
                    date: date,
                    formatted: date.toISOString().split('T')[0],
                    display: date.toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                    })
                };
            });

            setDates(nextDays);
            setSelectedDate(nextDays[0]);
        };

        generateDates();
    }, []);

    // Fetch doctor and appointments data
    useEffect(() => {
        const fetchDoctorAndAppointments = async () => {
            try {
                // Mock doctor data
                const mockDoctor = {
                    id: parseInt(id),
                    name: 'Dr. Sarah Miller',
                    specialty: 'Cardiology',
                    rating: 4.8,
                    imageUrl: null,
                    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Friday']
                };

                // Mock appointments data
                const mockAppointments = [
                    {
                        id: 1,
                        patientName: 'John Smith',
                        patientEmail: 'john.smith@example.com',
                        patientPhone: '(555) 123-4567',
                        date: '2025-04-21',
                        time: '10:00 AM',
                        type: 'Check-up',
                        status: 'confirmed',
                        notes: 'Follow-up on heart medication'
                    },
                    {
                        id: 2,
                        patientName: 'Emily Johnson',
                        patientEmail: 'emily.j@example.com',
                        patientPhone: '(555) 234-5678',
                        date: '2025-04-21',
                        time: '2:30 PM',
                        type: 'Consultation',
                        status: 'confirmed',
                        notes: 'First time consultation'
                    },
                    {
                        id: 3,
                        patientName: 'Michael Brown',
                        patientEmail: 'michael.b@example.com',
                        patientPhone: '(555) 345-6789',
                        date: '2025-04-22',
                        time: '9:30 AM',
                        type: 'Follow-up',
                        status: 'cancelled',
                        notes: 'Annual check-up'
                    },
                    {
                        id: 4,
                        patientName: 'Jessica Lee',
                        patientEmail: 'jess.lee@example.com',
                        patientPhone: '(555) 456-7890',
                        date: '2025-04-22',
                        time: '11:00 AM',
                        type: 'Procedure',
                        status: 'pending',
                        notes: 'ECG scheduled'
                    },
                    {
                        id: 5,
                        patientName: 'Robert Wilson',
                        patientEmail: 'robert.w@example.com',
                        patientPhone: '(555) 567-8901',
                        date: '2025-04-23',
                        time: '3:00 PM',
                        type: 'Emergency',
                        status: 'confirmed',
                        notes: 'Chest pain evaluation'
                    },
                    {
                        id: 6,
                        patientName: 'Sarah Davis',
                        patientEmail: 'sarah.d@example.com',
                        patientPhone: '(555) 678-9012',
                        date: '2025-04-24',
                        time: '1:00 PM',
                        type: 'Consultation',
                        status: 'confirmed',
                        notes: ''
                    }
                ];

                setDoctor(mockDoctor);
                setAppointments(mockAppointments);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchDoctorAndAppointments();
    }, [id]);

    const handleAddAppointment = () => {
        if (!selectedDate || !selectedTimeSlot || !patientName || !patientEmail) {
            alert('Please fill in all required fields');
            return;
        }

        const newAppointment = {
            id: Date.now(),
            patientName,
            patientEmail,
            patientPhone,
            date: selectedDate.formatted,
            time: selectedTimeSlot,
            type: appointmentType,
            status: 'pending',
            notes: appointmentNotes
        };

        setAppointments([...appointments, newAppointment]);

        // Reset form
        setSelectedTimeSlot('');
        setPatientName('');
        setPatientEmail('');
        setPatientPhone('');
        setAppointmentType('');
        setAppointmentNotes('');
        setShowAddAppointment(false);
    };

    const handleCancelAppointment = (appointmentId) => {
        const updatedAppointments = appointments.map(appointment =>
            appointment.id === appointmentId ? { ...appointment, status: 'cancelled' } : appointment
        );

        setAppointments(updatedAppointments);
    };

    const handleConfirmAppointment = (appointmentId) => {
        const updatedAppointments = appointments.map(appointment =>
            appointment.id === appointmentId ? { ...appointment, status: 'confirmed' } : appointment
        );

        setAppointments(updatedAppointments);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed':
                return 'text-green-500 bg-green-50';
            case 'pending':
                return 'text-yellow-500 bg-yellow-50';
            case 'cancelled':
                return 'text-red-500 bg-red-50';
            default:
                return 'text-gray-500 bg-gray-50';
        }
    };

    const filteredAppointments = appointments.filter(appointment => {
        return (
            (statusFilter === 'all' || appointment.status === statusFilter) &&
            (dateFilter === 'all' || appointment.date === dateFilter)
        );
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="bg-white shadow px-6 py-4">
                <div className="flex items-center">
                    <button
                        onClick={() => navigate('/doctor')}
                        className="mr-4 p-2 rounded-full hover:bg-gray-100"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-xl font-semibold">{doctor.name}'s Schedule</h1>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto py-8 px-4">
                {/* Doctor info card */}
                <div className="bg-white rounded-lg shadow mb-6 p-6">
                    <div className="flex items-center">
                        <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl mr-4">
                            {doctor.name.split(' ')[1] ? doctor.name.split(' ')[1][0] : doctor.name[0]}
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">{doctor.name}</h2>
                            <p className="text-blue-600">{doctor.specialty}</p>
                            <div className="flex items-center mt-1">
                                <span className="text-sm bg-blue-50 text-blue-600 px-2 py-1 rounded mr-2">
                                    Rating: {doctor.rating}
                                </span>
                                <span className="text-sm">
                                    Available: {doctor.availableDays.join(', ')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="flex flex-wrap items-center justify-between mb-6">
                    <div className="flex items-center mb-4 sm:mb-0">
                        <h2 className="text-lg font-semibold mr-4">Appointments</h2>
                        <button
                            onClick={() => setShowAddAppointment(true)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-1 hover:bg-blue-700"
                        >
                            <Plus className="w-4 h-4" />
                            <span>New Appointment</span>
                        </button>
                    </div>
                    <div className="flex flex-wrap items-center space-x-2">
                        <div className="relative">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Status</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="pending">Pending</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div className="relative">
                            <select
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                                className="bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Dates</option>
                                {dates.map((date) => (
                                    <option key={date.formatted} value={date.formatted}>
                                        {date.display}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Appointments Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Patient
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date & Time
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Type
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {filteredAppointments.length > 0 ? (
                                filteredAppointments.map((appointment) => (
                                    <tr key={appointment.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                                                    {appointment.patientName.charAt(0)}
                                                </div>
                                                <div className="ml-3">
                                                    <div className="text-sm font-medium text-gray-900">{appointment.patientName}</div>
                                                    <div className="text-sm text-gray-500">{appointment.patientEmail}</div>
                                                    <div className="text-sm text-gray-500">{appointment.patientPhone}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <div className="flex items-center text-sm text-gray-900">
                                                    <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                                                    {new Date(appointment.date).toLocaleDateString('en-US', {
                                                        weekday: 'short',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </div>
                                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                                    <Clock className="w-4 h-4 mr-1 text-gray-500" />
                                                    {appointment.time}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-50 text-blue-800">
                                                    {appointment.type || 'General'}
                                                </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                                                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                                </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-2">
                                                {appointment.status === 'pending' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleConfirmAppointment(appointment.id)}
                                                            className="text-green-500 hover:text-green-700"
                                                            title="Confirm"
                                                        >
                                                            <CheckCircle className="w-5 h-5" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleCancelAppointment(appointment.id)}
                                                            className="text-red-500 hover:text-red-700"
                                                            title="Cancel"
                                                        >
                                                            <XCircle className="w-5 h-5" />
                                                        </button>
                                                    </>
                                                )}
                                                <button
                                                    className="text-blue-500 hover:text-blue-700"
                                                    title="Message"
                                                >
                                                    <MessageSquare className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                        No appointments found matching your filters.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}