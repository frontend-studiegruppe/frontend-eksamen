"use client";
import { useState } from "react";
import Button from "../Button";

const EditPopUp = ({ event, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: event.title || "",
    description: event.description || "",
    date: event.date || "",
    time: event.time || "",  // Tidspunkt
    locationId: event.locationId || "",
    curator: event.curator || "",
    totalTickets: event.totalTickets || "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData);  // Call the function from EditIcon to send data
  };

  const handleClose = (e) => {
    e.stopPropagation(); // Prevent click from bubbling up to Link
    onClose(); // Close the pop-up
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm"
      onClick={handleClose} // Handles click on the background
    >
      <div
        className="bg-white p-8 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.2)] w-full max-w-xl mx-auto"
        onClick={(e) => e.stopPropagation()} // Prevent click from bubbling up
      >
        <h2 className="font-semibold text-center text-xl mb-6">Rediger Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm mb-1">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full rounded-md p-2 shadow-[0_0_10px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-primary-red"
            />
          </div>
          
          {/* Tidspunkt field */}
          <div className="mb-4">
            <label htmlFor="time" className="block text-sm mb-1">
              Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              className="w-full rounded-md p-2 shadow-[0_0_10px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-primary-red"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="locationId" className="block text-sm mb-1">
              Location
            </label>
            <input
              type="text"
              id="locationId"
              name="locationId"
              value={formData.locationId}
              onChange={handleInputChange}
              className="w-full rounded-md p-2 shadow-[0_0_10px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-primary-red"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="title" className="block text-sm mb-1">
              Event Name
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full rounded-md p-2 shadow-[0_0_10px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-primary-red"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full rounded-md p-2 shadow-[0_0_10px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-primary-red"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="totalTickets" className="block text-sm mb-1">
              Total Tickets
            </label>
            <input
              type="number"
              id="totalTickets"
              name="totalTickets"
              value={formData.totalTickets}
              onChange={handleInputChange}
              className="w-full rounded-md p-2 shadow-[0_0_10px_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-primary-red"
            />
          </div>

          <div className="flex justify-between mt-6">
            <Button variant="CTA" type="submit" className="w-full ">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPopUp;
