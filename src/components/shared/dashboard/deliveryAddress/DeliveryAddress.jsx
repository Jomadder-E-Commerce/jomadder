'use client'
import React, { useState } from 'react';

const DeliveryAddress = () => {
    // State to control modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function to toggle the modal
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className="p-4">

            <div className='flex justify-between'>
                <h2 className="mb-4 text-xl font-semibold ">Delivery Addresses</h2>
                <button 
                    className="p-2 text-sm text-white bg-black rounded-md"
                    onClick={toggleModal} // Open modal on click
                >
                    Add new Address
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] relative">
                        {/* Close button */}
                        <button 
                            className="absolute text-xl top-2 right-4"
                            onClick={toggleModal} // Close modal on click
                        >
                            &times;
                        </button>
                        
                        <h2 className="mb-4 text-lg font-semibold">Add new address</h2>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-2 text-sm font-medium">Full Name</label>
                                <input 
                                    type="text" 
                                    className="w-full p-2 border rounded"
                                    placeholder="Shanjida Moury"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium">Building / Property</label>
                                <input 
                                    type="text" 
                                    className="w-full p-2 border rounded"
                                    placeholder="e.g Mappler 2"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium">Phone Number</label>
                                <input 
                                    type="text" 
                                    className="w-full p-2 border rounded"
                                    placeholder="Add Phone Number"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium">Select a city</label>
                                <select className="w-full p-2 border rounded">
                                    <option>Select a city</option>
                                    {/* Add more cities here */}
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium">Street / Apartment / Villa</label>
                                <input 
                                    type="text" 
                                    className="w-full p-2 border rounded"
                                    placeholder="e.g 940 - F40"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium">Area / District</label>
                                <select className="w-full p-2 border rounded">
                                    <option>Area / District</option>
                                    {/* Add more areas here */}
                                </select>
                            </div>
                        </div>

                        <div className="mt-6 text-right">
                            <button 
                                className="px-4 py-2 text-white bg-black rounded-md"
                                onClick={toggleModal} // Close modal after saving
                            >
                                Add new address
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeliveryAddress;
