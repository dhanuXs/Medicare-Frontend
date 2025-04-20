import React from "react";
import { Heart, Check, Plus } from "lucide-react";
import sampleVedio from '../../assets/vedio/videoplayback (1).mp4'

const AboutPage = () => {
    return (
        <div className="p-8" style={{height:"600px"}}>
            <div className="grid grid-cols-2 h-100">
                {/* Image section */}
                <div className=" w-full relative place-self-center" style={{padding:"6rem",paddingRight:"2rem"}}>
                    <div className="relative rounded-lg overflow-hidden shadow-lg ">
                        <video className="" autoPlay controls>
                            <source src={sampleVedio} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-16 h-16 flex items-center justify-center">
                            <div className="ml-1">
                                <svg
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Content section */}
                <div className="w-4xl  place-self-start " style={{padding:"5rem",paddingLeft:"3rem"}}>
                    <h1 className="text-3xl font-bold text-slate-700 mb-2">About Us</h1>
                    <p className="text-gray-700 mb-8">
                        Dolor iure expedita id fuga asperiores qui sunt consequatur minima.
                        Quidem voluptas deleniti. Sit quia molestiae quia quas qui magnam
                        itaque veritatis dolores. Corrupti totam ut eius incidunt reiciendis
                        veritatis asperiores placeat.
                    </p>

                    {/* Feature blocks */}
                    <div className="space-y-8">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                                    <Check size={24} />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-blue-900 mb-2">
                                    Ullamco laboris nisi ut aliquip consequat
                                </h2>
                                <p className="text-gray-600">
                                    Magni facilis facilis repellendus cum excepturi quaerat
                                    praesentium libre trade
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                                    <Plus size={24} />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-blue-900 mb-2">
                                    Magnam soluta odio exercitationem reprehenderi
                                </h2>
                                <p className="text-gray-600">
                                    Quo totam dolorum at pariatur aut distinctio dolorum
                                    laudantium illo direna pasata redi
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                                    <Heart size={24} />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-blue-900 mb-2">
                                    Voluptatem et qui exercitationem
                                </h2>
                                <p className="text-gray-600">
                                    Et velit et eos maiores est tempora et quos dolorem autem
                                    tempora incidunt maxime veniam
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Back to top button */}
            <div className="fixed bottom-6 right-6">
                <button className="bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 rounded-lg flex items-center justify-center shadow-lg">
                    <svg
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="12" y1="19" x2="12" y2="5"></line>
                        <polyline points="5 12 12 5 19 12"></polyline>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default AboutPage;
