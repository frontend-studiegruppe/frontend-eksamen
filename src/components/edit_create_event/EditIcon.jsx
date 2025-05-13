import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import EditPopUp from "./EditPopUp";

const EditIcon = ({ event }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation(); // Stopper klik fra at boble op til Link
    e.preventDefault();  // Forhindrer navigation
    setShowModal(true);  // Vist pop-up
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Funktion til at håndtere submit fra EditPopUp
  const handleUpdateEvent = async (updatedData) => {
    try {
      const response = await fetch(
        `https://server-gititgirls.onrender.com/events/${event.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update event");
      }

      const updatedEvent = await response.json();
      console.log("Event updated:", updatedEvent);
      setShowModal(false);  // Luk modalen efter opdatering
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="bg-primary-red hover:bg-[#F04F4F] !text-white rounded-full p-2 ease-in-out duration-200"
      >
        <FiEdit3 size={24}></FiEdit3>
      </button>

      {showModal && (
        <EditPopUp 
          event={event} 
          onClose={handleCloseModal} 
          onSubmit={handleUpdateEvent} 
        />
      )}
    </>
  );
};

export default EditIcon;
