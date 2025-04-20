import React from "react";
import Input from '../../component/emailComponent/Input.jsx'
import Button from '@mui/material/Button';

const ContactPage = () => {
    return (
        <div className="contact-page">
            <h1 className="text-3xl font-bold text-center text-gray-700 my-8">
                Contact
            </h1>

            <p className="text-center text-gray-600 mb-8">
                Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
                consectetur velit
            </p>

            {/* Map Section */}
            <div className="map-container relative w-full h-96 mb-8 bg-gray-200">
                {/* This would be replaced with an actual map component */}
                <div className="absolute inset-0 bg-blue-100">
                    <div className="mt-6 w-full h-96">
                        <iframe
                            title="Google Map"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.88739473302!2d79.78616464673383!3d6.927078884864798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25958f71d7d05%3A0xcacb5aebf7ec87ed!2sColombo!5e0!3m2!1sen!2slk!4v1681312142198!5m2!1sen!2slk"
                        ></iframe>
                    </div>
                </div>

                <div className="absolute top-4 left-4 bg-white p-2 rounded shadow text-sm">
                    Downtown Conference Center
                    <div className="text-blue-500 text-xs">View larger map</div>
                </div>

                <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
                    <button className="bg-white p-1 rounded shadow">
                        <div className="w-6 h-6 flex items-center justify-center">+</div>
                    </button>
                    <button className="bg-white p-1 rounded shadow">
                        <div className="w-6 h-6 flex items-center justify-center">-</div>
                    </button>
                </div>
            </div>

            {/* Contact Information and Form Section */}
            <div className="flex items-center justify-center" style={{padding:'4rem',paddingInline:"12rem"}}>
                {/* Contact Information */}
                <div className="w-full lg:w-1/3 space-y-6">
                    {/* Location */}
                    <div className="flex items-start">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-medium text-gray-800">Location</h3>
                            <p className="text-gray-600">
                                A108 Adam Street, New York, NY 535022
                            </p>
                        </div>
                    </div>

                    {/* Call Us */}
                    <div className="flex items-start">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-medium text-gray-800">Call Us</h3>
                            <p className="text-gray-600">+1 5589 55488 55</p>
                        </div>
                    </div>

                    {/* Email Us */}
                    <div className="flex items-start">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-medium text-gray-800">Email Us</h3>
                            <p className="text-gray-600">info@example.com</p>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="w-full lg:w-2/3">
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Input id='name' name='Your Name' type='text'/>
                            </div>
                            <div>
                                <Input id='email' name='Your Email' type='email'/>
                            </div>

                        </div>
                        <div>
                            <div>
                                <Input id='subject' name='Subject' type='text'/>
                            </div>
                        </div>
                        <div>
              <textarea
                  placeholder="Message"
                  rows="5"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" style={{marginTop:"1rem"}}
              ></textarea>
                        </div>
                        <div className="text-center">
                            <Button variant="contained">Send Message</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
