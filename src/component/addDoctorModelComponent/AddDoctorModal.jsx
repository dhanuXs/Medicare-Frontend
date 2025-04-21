import React, { useState } from 'react';
import { UserPlus, X } from 'lucide-react';

export default function AddDoctorModal({ isOpen, onClose, onAddDoctor }) {
    const [formData, setFormData] = useState({
        name: '',
        specialization: '',
        contactNumber: '',
        email: '',
        imgUrl: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.specialization.trim()) newErrors.specialization = 'Specialization is required';
        if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Contact number is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Submit form
        setIsSubmitting(true);

        // Create new doctor object
        const newDoctor = {
            id: Date.now(), // temporary ID for demo
            name: formData.name,
            specialty: formData.specialization,
            email: formData.email,
            rating: 0,
            patients: 0,
            experience: 'New',
            availability: 'Available',
            nextAvailable: new Date().toISOString().split('T')[0],
            contactNumber: formData.contactNumber,
            imgUrl: formData.imgUrl || ''
        };

        // Call the onAddDoctor function to add the doctor to the list
        onAddDoctor(newDoctor);

        // Reset form and close modal
        setFormData({
            name: '',
            specialization: '',
            contactNumber: '',
            email: '',
            imgUrl: ''
        });
        setIsSubmitting(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-white bg-opacity-20 flex items-center justify-center z-50" >
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex items-center mb-6">
                    <UserPlus className="w-6 h-6 text-blue-600 mr-2" />
                    <h2 className="text-xl font-bold text-gray-800">Add New Doctor</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="name">
                            Doctor Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Dr. John Smith"
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="specialization">
                            Specialization *
                        </label>
                        <input
                            type="text"
                            id="specialization"
                            name="specialization"
                            value={formData.specialization}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md ${errors.specialization ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Cardiology"
                        />
                        {errors.specialization && <p className="mt-1 text-sm text-red-500">{errors.specialization}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="contactNumber">
                            Contact Number *
                        </label>
                        <input
                            type="text"
                            id="contactNumber"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md ${errors.contactNumber ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="(555) 123-4567"
                        />
                        {errors.contactNumber && <p className="mt-1 text-sm text-red-500">{errors.contactNumber}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="email">
                            Email *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="doctor@example.com"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="imgUrl">
                            Profile Image URL
                        </label>
                        <input
                            type="file"
                            id="imgUrl"
                            name="imgUrl"
                            value={formData.imgUrl}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="https://example.com/doctor-image.jpg"
                        />
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-700 disabled:bg-blue-300"
                        >
                            {isSubmitting ? (
                                <span>Processing...</span>
                            ) : (
                                <>
                                    <UserPlus className="w-5 h-5" />
                                    <span>Add Doctor</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}