import { Padding } from '@mui/icons-material';
import { AlignJustify } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const StatCounter = ({ label, targetValue, duration = 2000, icon }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime;
        let animationFrame;

        const updateCount = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;

            if (progress < duration) {
                const nextCount = Math.floor((progress / duration) * targetValue);
                setCount(nextCount);
                animationFrame = requestAnimationFrame(updateCount);
            } else {
                setCount(targetValue);
            }
        };

        animationFrame = requestAnimationFrame(updateCount);

        return () => {
            cancelAnimationFrame(animationFrame);
        };
    }, [targetValue, duration]);

    return (
        <div className="bg-white p-8 rounded-lg shadow-md text-center" style={{height:"10rem",alignContent:"center"}}>
            <div className="flex justify-center mb-4">
                <div className="bg-blue-500 text-white p-3 rounded-full">
                    {icon}
                </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-2">{count}</h2>
            <p className="text-gray-600">{label}</p>
        </div>
    );
};

const StatsSection = () => {
    // Stats data
    const stats = [
        {
            label: "Doctors",
            value: 85,
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M15 6h.01M18 6h.01"></path>
                <path d="M18 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
                <path d="M14 15l2-2l2 2"></path>
            </svg>
        },
        {
            label: "Departments",
            value: 18,
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                <rect x="9" y="9" width="6" height="6"></rect>
                <line x1="9" y1="1" x2="9" y2="4"></line>
                <line x1="15" y1="1" x2="15" y2="4"></line>
                <line x1="9" y1="20" x2="9" y2="23"></line>
                <line x1="15" y1="20" x2="15" y2="23"></line>
                <line x1="20" y1="9" x2="23" y2="9"></line>
                <line x1="20" y1="14" x2="23" y2="14"></line>
                <line x1="1" y1="9" x2="4" y2="9"></line>
                <line x1="1" y1="14" x2="4" y2="14"></line>
            </svg>
        },
        {
            label: "Research Labs",
            value: 12,
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 2v7.31"></path>
                <path d="M14 9.3V2"></path>
                <path d="M8.5 2h7"></path>
                <path d="M14 9.3a6 6 0 1 1-4 0"></path>
                <path d="M5.52 16h12.96"></path>
            </svg>
        },
        {
            label: "Awards",
            value: 150,
            icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="6"></circle>
                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
            </svg>
        }
    ];

    return (
        <div className="bg-blue-50 grid grid-cols-1">
            <div style={{display:"grid",height:"400px",Padding:"10rem", alignItems:"center"}}>
                <div className="">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" style={{padding:"1rem"}}>
                        {stats.map((stat, index) => (
                            <StatCounter
                                key={index}
                                label={stat.label}
                                targetValue={stat.value}
                                icon={stat.icon}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsSection;