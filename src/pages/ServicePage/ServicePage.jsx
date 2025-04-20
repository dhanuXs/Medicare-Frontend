import React from "react";
import { SimpleCard } from "../../component/simpleCardComponent/SimpleCard";
import { div } from "framer-motion/client";

function ServicePage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-700 mb-2 text-center">Service</h1>
            <div className="grid grid-cols-3 gap-8 place-items-center" style={{padding:"8em"}}>
                <SimpleCard />
                <SimpleCard />
                <SimpleCard />
                <SimpleCard />
                <SimpleCard />
                <SimpleCard />
            </div>
        </div>
    );
}

export default ServicePage;
