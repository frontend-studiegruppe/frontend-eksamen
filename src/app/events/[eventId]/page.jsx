// Maja
// import Gallery from "@/components/single_event/art_gallery/Gallery";
import TestGallery from "@/components/single_event/art_gallery/TestGallery";
import Eventinfo from "@/components/single_event/EventInfo";
import SignUpForm from "@/components/single_event/sign_up/SignUpForm";

export default function Eventpage() {
  return (
    <div>
      {/* <Gallery /> */}
      <TestGallery />
      <Eventinfo />
      <SignUpForm />
    </div>
  );
}
