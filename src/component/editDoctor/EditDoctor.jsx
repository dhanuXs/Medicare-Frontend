import React, { useState, useEffect } from 'react';
import { ArrowLeft, Camera, Save, X, Trash2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditDoctor() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [doctor, setDoctor] = useState({
        name: '',
        email: '',
        specialty: '',
        experience: '',
        patients: 0,
        rating: 0,
        availability: 'Available',
        nextAvailable: '',
        bio: '',
        phone: '',
        address: '',
        education: [],
        certificates: []
    });

    // Specialties list for dropdown
    const specialties = [
        'Cardiology',
        'Neurology',
        'Pediatrics',
        'Dermatology',
        'Orthopedics',
        'General Practice',
        'Psychiatry',
        'Ophthalmology',
        'Gynecology',
        'Urology',
        'ENT',
        'Oncology'
    ];

    // Fetch doctor data
    useEffect(() => {
        // Simulate fetching doctor data from an API
        const fetchDoctor = async () => {
            try {
                // In a real app, you would fetch from your API using the id
                // For this example, we'll simulate with the first doctor from your dataset
                const mockDoctor = {
                    id: 1,
                    name: 'Dr. Sarah Miller',
                    email: 'sarah.miller@example.com',
                    specialty: 'Cardiology',
                    rating: 4.8,
                    patients: 124,
                    experience: '12 years',
                    availability: 'Available',
                    nextAvailable: '2025-04-21',
                    bio: 'Dr. Sarah Miller is a board-certified cardiologist with extensive experience in treating heart conditions.',
                    phone: '(555) 123-4567',
                    address: '123 Medical Center Dr, New York, NY 10001',
                    education: [
                        { id: 1, institution: 'Harvard Medical School', degree: 'M.D.', year: '2013' },
                        { id: 2, institution: 'Johns Hopkins University', degree: 'B.S. Biology', year: '2009' }
                    ],
                    certificates: [
                        { id: 1, name: 'Board Certification in Cardiology', year: '2015' },
                        { id: 2, name: 'Advanced Cardiac Life Support', year: '2018' }
                    ]
                };

                setDoctor(mockDoctor);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching doctor:', error);
                setLoading(false);
            }
        };

        fetchDoctor();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDoctor({ ...doctor, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setProfileImage(null);
        setImagePreview(null);
    };

    // Education handlers
    const addEducation = () => {
        const newEducation = { id: Date.now(), institution: '', degree: '', year: '' };
        setDoctor({ ...doctor, education: [...doctor.education, newEducation] });
    };

    const updateEducation = (id, field, value) => {
        const updatedEducation = doctor.education.map(edu =>
            edu.id === id ? { ...edu, [field]: value } : edu
        );
        setDoctor({ ...doctor, education: updatedEducation });
    };

    const removeEducation = (id) => {
        const updatedEducation = doctor.education.filter(edu => edu.id !== id);
        setDoctor({ ...doctor, education: updatedEducation });
    };

    // Certificate handlers
    const addCertificate = () => {
        const newCertificate = { id: Date.now(), name: '', year: '' };
        setDoctor({ ...doctor, certificates: [...doctor.certificates, newCertificate] });
    };

    const updateCertificate = (id, field, value) => {
        const updatedCertificates = doctor.certificates.map(cert =>
            cert.id === id ? { ...cert, [field]: value } : cert
        );
        setDoctor({ ...doctor, certificates: updatedCertificates });
    };

    const removeCertificate = (id) => {
        const updatedCertificates = doctor.certificates.filter(cert => cert.id !== id);
        setDoctor({ ...doctor, certificates: updatedCertificates });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Here you would typically send the updated doctor data to your API
        console.log('Updated doctor data:', doctor);
        console.log('New profile image:', profileImage);

        // Simulate successful update
        alert('Doctor profile updated successfully!');
        navigate('/doctor'); // Navigate back to doctor list
    };

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
                    <h1 className="text-xl font-semibold">Edit Doctor Profile</h1>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-5xl mx-auto py-8 px-4">
                <form onSubmit={handleSubmit}>
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        {/* Profile Image Section */}
                        <div className="p-6 border-b">
                            <h2 className="text-lg font-medium mb-4">Profile Photo</h2>
                            <div className="flex items-center">
                                <div className="relative">
                                    {imagePreview ? (
                                        <div className="w-24 h-24 rounded-full overflow-hidden">
                                            <img
                                                src={imagePreview}
                                                alt="Profile Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                                            {doctor.name.split(' ')[1] ? doctor.name.split(' ')[1][0] : doctor.name[0]}
                                        </div>
                                    )}

                                    <label htmlFor="profile-photo" className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 cursor-pointer text-white">
                                        <Camera className="w-4 h-4" />
                                    </label>
                                    <input
                                        type="file"
                                        id="profile-photo"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </div>

                                <div className="ml-6">
                                    <p className="text-sm text-gray-600 mb-2">Upload a new photo</p>
                                    <div className="flex space-x-2">
                                        <label
                                            htmlFor="profile-photo"
                                            className="px-4 py-2 bg-gray-100 rounded-md text-sm font-medium cursor-pointer hover:bg-gray-200"
                                        >
                                            Choose File
                                        </label>
                                        {imagePreview && (
                                            <button
                                                type="button"
                                                onClick={handleRemoveImage}
                                                className="px-4 py-2 bg-red-50 text-red-600 rounded-md text-sm font-medium hover:bg-red-100"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Basic Information */}
                        <div className="p-6 border-b">
                            <h2 className="text-lg font-medium mb-4">Basic Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={doctor.name}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={doctor.email}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={doctor.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Specialty
                                    </label>
                                    <select
                                        name="specialty"
                                        value={doctor.specialty}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Select Specialty</option>
                                        {specialties.map(specialty => (
                                            <option key={specialty} value={specialty}>
                                                {specialty}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Experience
                                    </label>
                                    <input
                                        type="text"
                                        name="experience"
                                        value={doctor.experience}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="e.g. 10 years"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Availability Status
                                    </label>
                                    <select
                                        name="availability"
                                        value={doctor.availability}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="Available">Available</option>
                                        <option value="Unavailable">Unavailable</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Next Available Date
                                    </label>
                                    <input
                                        type="date"
                                        name="nextAvailable"
                                        value={doctor.nextAvailable}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Total Patients
                                    </label>
                                    <input
                                        type="number"
                                        name="patients"
                                        value={doctor.patients}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="p-6 border-b">
                            <h2 className="text-lg font-medium mb-4">Address</h2>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Address
                                </label>
                                <textarea
                                    name="address"
                                    value={doctor.address}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                ></textarea>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="p-6 flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={() => navigate('/doctor')}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}