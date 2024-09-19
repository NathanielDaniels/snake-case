// "use client";
import Confetti from "react-dom-confetti";
const DesignPreview = () => {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center"
      >
        {/* <Confetti activ e={true} config={{ spread: 360 }} /> */}
      </div>
      <h1 className="text-2xl font-bold">Design Preview</h1>
      <p className="text-gray-500">This is a preview of your design</p>
    </>
  );
};

export default DesignPreview;
