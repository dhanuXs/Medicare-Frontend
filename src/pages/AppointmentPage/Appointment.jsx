import Input from "../../component/emailComponent/Input.jsx";
import React, { useState } from "react";
import './AppointmentPage.css'
import Button from '@mui/material/Button';
import { div } from "framer-motion/client";

function AppointmentPage() {

    return (
        <div style={{paddingBlock:"4rem"}}>
            <h1 className="text-3xl font-bold text-slate-700 mb-2 text-center">
                Appointment
            </h1>
            <div style={{ padding: "4rem", paddingInline: "8rem" }}>
                <form action="" className="grid grid-cols-3 gap-4">
                    <div>
                        <Input id="name" name="Your Name" type="text" placeHolder="" />
                    </div>
                    <div>
                        <Input id="email" name="Your Email" type="email" placeHolder="" />
                    </div>
                    <div>
                        <Input id="phone" name="Your Phone" type="number" placeHolder="" />
                    </div>
                    <div>
                        <Input id="date" name="" type="date" placeHolder="" />
                    </div>
                    <div>
                        <Input id="date" name="date" type="calender" placeHolder="" />
                    </div>
                    <div>
                        <Input id="date" name="" type="calender" placeHolder="" />
                    </div>
                    <div className="col-span-3">
            <textarea
                name="Your Message"
                placeholder="Your Message"
                style={{
                    boxShadow:
                        "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset",
                    padding: "1rem",
                    borderRadius: "10px",
                    width: "100%", // Make sure it fills the column
                    minHeight: "120px", // Optional: gives some height
                }}
            />
                    </div>
                    <div className="col-span-3 flex justify-center gap-x-4 mt-4">
                        <Button variant="contained">Make an Appointment</Button>
                        <Button variant="outlined">Request TO Meeting</Button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default AppointmentPage;
