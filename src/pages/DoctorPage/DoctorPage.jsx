import React from 'react'
import HorizontalCard from '../../component/horizontalCard/HorizontalCard.jsx'

function DoctorPage() {
    return (
        <div>
            <h2 className="text-3xl font-bold text-slate-700 mb-2 text-center">Doctors</h2>
            <div className='grid grid-cols-3 gap-8' style={{padding:"8rem"}}>
                <HorizontalCard />
                <HorizontalCard />
                <HorizontalCard />
                <HorizontalCard />
                <HorizontalCard />
                <HorizontalCard />
            </div>
        </div>
    )
}

export default DoctorPage;