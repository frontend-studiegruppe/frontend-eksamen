//Matilde og Katinka
"use client"
import { useState } from "react";
import { useEventFormLogic } from "@/components/edit_create_event/forms/eventFormsLogic";
import ArtworkList from "@/components/edit_create_event/ArtworkList";
import EventForm from "@/components/edit_create_event/forms/InputForm";
import Button from "@/components/Button";
import PopUpBase from "@/components/PopUpBaseLayout";
import Link from "next/link";
import BtnWithArrow from "@/components/BtnWithArrow";
import { RxCross2 } from "react-icons/rx";

export default function Page() {
    const {
        dates,
        locations,
        isLocationOccupied,
        createNewEvent,
      } = useEventFormLogic();


    const [selectedArtworks, setSelectedArtworks] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [showPopup, setShowPopup] = useState(false);
    const [eventLink, setEventLink] = useState("");

      // Midlertidigt gem data fra step 1
  const [formData, setFormData] = useState({});
  const [artworkError, setArtworkError] = useState("");

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Når form i step 1 valideres:
  const handleNextStep = (dataFromForm) => {
    setFormData(dataFromForm);
    setStep(2);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

// Når event oprettes i step 2
const handleCreateEvent = async () => {
    // Tjek om mindst ét artwork er valgt
    if (selectedArtworks.length === 0) {
      setArtworkError("Du skal vælge mindst ét artwork for at oprette event.");
      return;
    }

    setArtworkError(""); // Clear error hvis ok
    setIsSubmitting(true);

    const eventData = {
      ...formData,
      artworkIds: selectedArtworks.map(id => id.replace('_object', '')),
    };

    console.log("Data sendt ved oprettelse af event:", eventData);

    try {
        const [createdEvent] = await Promise.all([createNewEvent(eventData), wait(1000)]);
        setEventLink(`/events/${createdEvent.id}`);
        
        setShowPopup(true);
        // evt. nulstil formular hvis ønsket
      } catch (error) {
        console.error("Fejl ved oprettelse af event:", error);
      } finally {
        setIsSubmitting(false);
      }
    };


  return (
    <div>
      <h1>Opret Events</h1>
      <div className="grid grid-cols-[1fr_2fr] gap-12">
      <div>
      {/* <div className={`transition-opacity duration-300 ${step === 2 ? 'opacity-50 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}> */}
          <EventForm
            onNext={handleNextStep}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
          />
        </div>

        <div>
          <ArtworkList
            selectedArtworks={selectedArtworks}
            setSelectedArtworks={setSelectedArtworks}
            selectedDate={selectedDate}
            blurred={step === 1}  // Blur når step 1, ikke blur når step 2
          />
          {step === 2 && (
            <div className="mt-4 flex flex-col items-end w-full">
            <Button
            variant="CTA"
            onClick={handleCreateEvent}
            disabled={selectedArtworks.length === 0}
            loading={isSubmitting}
            loadingText="Opretter event..."
            >
            Opret Event
            </Button>
            {artworkError && <p className="!text-red-600 mt-2 !text-sm">{artworkError}</p>}
            </div>
          )}
        </div>
      </div>

      {showPopup && (
        <PopUpBase>
          <div className="flex justify-end">
            <button onClick={closePopup} className="hover:text-gray-500 ease-in-out duration-300">
              <RxCross2 />
            </button>
          </div>
          <p className="text-center">Event oprettet!</p>
          <div className="flex justify-center">
            <Link href={eventLink}>
              <BtnWithArrow>Gå til event</BtnWithArrow>
            </Link>
          </div>
        </PopUpBase>
      )}
    </div>
  );
}
