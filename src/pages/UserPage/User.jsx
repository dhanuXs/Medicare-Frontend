import React from 'react'
import HomePage from "../HomePage/HomePage.jsx";
import AboutPage from "../AboutPage/AboutPage.jsx";
import Header from "../../component/header/Header.jsx";
import StatsSection from "../StateCounter/StatsSection.jsx";
import DoctorPage from "../DoctorPage/DoctorPage.jsx";
import AppointmentPage from "../AppointmentPage/Appointment.jsx";
import ContactPage from "../ContactPage/ContactPage.jsx";
import ServicePage from "../ServicePage/ServicePage.jsx";

function User() {
  return (
    <div>
        <Header />
        <HomePage />
        <AboutPage />
        <StatsSection />
        <ServicePage />
        <DoctorPage />
        <AppointmentPage />
        <ContactPage />
    </div>
  )
}

export default User
