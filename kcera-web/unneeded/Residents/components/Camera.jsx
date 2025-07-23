import Webcam from "react-webcam";
import { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
const Camera = () => {
  const webcamRef = useRef(null);
  const [showButton, setShowButton] = useState(false);
  //   const [captureImg, SetCaptureImg] = useState(null);
  const navigate = useNavigate();

  const handleCapture = () => {
    if (webcamRef.current) {
      const imgSrc = webcamRef.current.getScreenshot();
      //   SetCaptureImg(imgSrc);
      //   setValue("emergencyPhoto", imgSrc);
      if (imgSrc) {
        navigate("/resident/confirmation", { state: { image: imgSrc } });
      }
    }
  };

  useEffect(() => {
    const webcamElement = webcamRef.current;
    if (webcamElement) {
      const onUserMedia = () => setShowButton(true);
      webcamElement.video?.addEventListener("playing", onUserMedia);
      return () => {
        webcamElement.video?.removeEventListener("playing", onUserMedia);
      };
    }
  }, []);

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpg"
        className="w-screen h-screen border-4 bg-black fixed top-0 left-0 z-2 object-cover"
      />
      {showButton && (
        <button
          className="absolute flex items-center justify-center bottom-6 left-1/2 transform -translate-x-1/2 border-2 border-white w-[100px] h-[100px] rounded-full shadow z-20"
          onClick={handleCapture}
        >
          <div className="w-[90%] h-[90%] bg-white rounded-full"></div>
        </button>
      )}
    </>
  );
};

export default Camera;
