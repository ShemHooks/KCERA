import { useState, useEffect } from "react";
import Webcam from "react-webcam";


const WebCamera = ({ webcamRef, SetCaptureImg, setCameraOn, setValue }) => {

  const [showButton, setShowButton] = useState(false);

  const handleCapture = () => {
    if (webcamRef.current) {
      const imgSrc = webcamRef.current.getScreenshot();
      SetCaptureImg(imgSrc);
      setValue("approval_photo", imgSrc);
      setCameraOn(false);
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
  }, [webcamRef]);
  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpg"
        className="w-screen h-screen border-4  bg-black fixed top-0 left-0 z-2 object-cover "
      />

      {showButton && (
        <button
          onClick={handleCapture}
          className="fixed bg-transparent bottom-0 z-20 mb-8 w-[70px] h-[70px] rounded-full cursor-pointer border-4 border-stone-100 p-4"
        ></button>
      )}
    </>
  );
};

export default WebCamera;
