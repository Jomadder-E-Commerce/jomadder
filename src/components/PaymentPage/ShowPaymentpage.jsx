"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDeletePaymentMutation, useGetpaymentQuery, useUpdatePaymentMutation } from '../Redux/services/paymentMethods/paymentApi';
import { Trash, X } from 'lucide-react';
import { FaRegEdit } from "react-icons/fa";
import { Dialog, DialogContent } from '../ui/dialog';
import { Input } from '../ui/input';
import { ImageHosting } from '../shared/Cloudinary/Cloudinary';
import { toast } from 'react-toastify';
import PaymentSkeleton from '../all-skeleton/CategorySkeleton/PaymentSkeleton';

const ShowPaymentpage = () => {
    const { data: paymentData, isLoading: getIsLoading } = useGetpaymentQuery();
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [UpdatePayment, { isLoading, data, isSuccess }] = useUpdatePaymentMutation();
    const [deletePayment] = useDeletePaymentMutation();

    const [editData, setEditData] = useState(null);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [newImage, setNewImage] = useState(null);
    const [imageDeleted, setImageDeleted] = useState(false);

    useEffect(() => {
        if (paymentData?.data?.length > 0) {
            if (data?.success) {
                setSelectedMethod(data?.data?._id);
            } else {
                setSelectedMethod(paymentData.data[0]._id);
            }
        }
    }, [paymentData, data]);

    const handleEditClick = (method) => {
        setEditData(method);
        setNewImage(null); // Reset new image on edit
        setImageDeleted(false); // Reset delete status
        setShowEditDialog(true);
    };

    const handleDelete = async (id) => {
        await deletePayment({ id });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
    
        // Create a shallow copy of editData to avoid modifying the original object directly
        const updatedEditData = { ...editData };
    
        // Handle image upload
        let imageUrl;
        if (newImage) {
            const imageResponse = await ImageHosting(newImage);
            imageUrl = imageResponse.url; // Store new image URL
        } else if (imageDeleted) {
            imageUrl = ''; // Clear image if deleted
        } else {
            imageUrl = updatedEditData.image; // Keep the old image if no new image is provided
        }
    
        if (updatedEditData.accountNo) {
            updatedEditData.accountNo = Number(updatedEditData.accountNo);
        }
    
        const updatedData = { ...updatedEditData, image: imageUrl }; // Update the editData with the new image URL
        const res = await UpdatePayment({ body: updatedData, id: updatedData._id });
        
        if (res?.data?.success) {
            toast.success("Successfully updated");
            setShowEditDialog(false);
            setSelectedMethod(updatedData._id);
            e.target.reset();
            setNewImage(null); // Reset new image state
        } else {
            toast.error(`${res?.error?.data?.message}`);
        }
    };
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewImage(file);
            setImageDeleted(false); // New image overrides delete status
        }
    };

    const handleImageDelete = () => {
        setImageDeleted(true);
        setNewImage(null); // Clear any new image
    };

    if (getIsLoading) {
        return <PaymentSkeleton />;
    }

    return (
        <div className='mt-10'>
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-4">
                {paymentData?.data?.map((method) => (
                    <div key={method._id} className="flex gap-2 border items-center h-30 justify-center p-2 rounded-lg cursor-pointer group relative">
                        <input
                            type="radio"
                            name="paymentMethod"
                            className="form-radio h-5 w-5 text-blue-600"
                            checked={selectedMethod === method._id}
                            onChange={() => setSelectedMethod(method._id)}
                        />
                        <div className=''>
                            <Image unoptimized src={method.image} alt={`${method.name} Logo`} width={80} height={50} className='object-cover' />
                        </div>
                        <div className='absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                            <button onClick={() => handleEditClick(method)}>
                                <FaRegEdit className="h-5 w-5 text-green-500" />
                            </button>
                            <button onClick={() => handleDelete(method._id)}>
                                <Trash className="h-5 w-5 text-red-500" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedMethod && (
                <div className="p-4 mt-4 border border-gray-300 rounded-lg bg-gray-100">
                    {paymentData?.data?.map((method) => {
                        if (method._id === selectedMethod) {
                            return (
                                <div key={method._id}>
                                    <div className="font-bold">Payment Method: {method.name}</div>
                                    {method.accountType === "bank" ? (
                                        <>
                                            <div>Account Name: {method.accountName}</div>
                                            <div>Account Number: {method.accountNo}</div>
                                            <div>Branch: {method.branch}</div>
                                        </>
                                    ) : (
                                        <>
                                            <div>Personal Number: {method.personalNumber}</div>
                                            <div>Agent Number: {method.agentNumber}</div>
                                        </>
                                    )}
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            )}

            {/* Edit Dialog */}
            <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
                <DialogContent>
                    <form onSubmit={handleUpdate} className="space-y-4">
                        <h3 className="text-xl font-semibold">Edit Payment Method</h3>

                        {editData?.image && !newImage && !imageDeleted && (
                            <div className="relative group">
                                <Image unoptimized  
                                    src={newImage? URL.createObjectURL(newImage) : editData.image}
                                    alt="Current Payment Image"
                                    width={80}
                                    height={80}
                                    className="object-cover w-20 mx-auto"
                                />
                                <button
                                    className="absolute top-0 right-36 bg-red-500 text-white rounded-full p-1 hidden group-hover:block"
                                    onClick={handleImageDelete}
                                    type="button"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                        <div>
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="image">Update Image</label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>

                        {editData?.accountType === 'mobile banking' ? (
                            <>
                                <div>
                                    <label className="block text-gray-700">Mobile Banking Name</label>
                                    <Input
                                        type="text"
                                        name="name"
                                        value={editData?.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Personal Number</label>
                                    <Input
                                        type="text"
                                        name="personalNumber"
                                        value={editData?.personalNumber}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Agent Number</label>
                                    <Input
                                        type="text"
                                        name="agentNumber"
                                        value={editData?.agentNumber}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <label className="block text-gray-700">Account Name</label>
                                    <Input
                                        type="text"
                                        name="accountName"
                                        value={editData?.accountName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Account Number</label>
                                    <Input
                                        type="text"
                                        name="accountNo"
                                        value={editData?.accountNo}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700">Branch</label>
                                    <Input
                                        type="text"
                                        name="branch"
                                        value={editData?.branch}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        )}

                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Updating...' : 'Update'}
                        </button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ShowPaymentpage;
