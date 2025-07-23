import { Button } from '@mui/material'
import Webcam from 'react-webcam'
import GetEmergencyRequest from '../services/getEmergencyRequest'
import { useGeolocation } from 'react-use'
import { useState, useEffect } from 'react'
const SubmitModal = ({ setModal, setShowWebcam, showWebcam, webcamRef, imgSrc, setImgSrc, type }) => {

  const [showButton, setShowButton] = useState(false);

  const requester = localStorage.getItem('fullName')
  const handleClick = () => {
    const screenshot = webcamRef.current?.getScreenshot?.()
    if (screenshot) {
      setImgSrc(screenshot)
      setShowWebcam(false)
    }
  }
  const handleDiscard = () => {
    if (imgSrc) {
      setImgSrc(null)
    }
    setShowWebcam(false);
    setModal(false);
  };

  const toDataUrl = async (dataUrl) => {
    const res = await fetch(dataUrl);
    return await res.blob();
  }



  const userLocation = useGeolocation({ enableHighAccuracy: true });
  const latitude = userLocation.latitude
  const longtitude = userLocation.longitude

  const handleSend = async () => {
    if (!imgSrc) {
      alert('Captrued Image is required');
      return;
    }

    if (!latitude || !longtitude) {
      alert('Location not available. Please enable GPS and try again.');
      return;
    }

    const imageBlob = await toDataUrl(imgSrc)

    await GetEmergencyRequest(type, latitude, longtitude, imageBlob);

  }


  useEffect(() => {
    if (!showWebcam) return;

    const interval = setInterval(() => {
      const webcamElement = webcamRef.current;
      const video = webcamElement?.video;

      if (video) {
        const onUserMedia = () => {
          console.log("Video is playing");
          setShowButton(true);
        };

        if (!video.paused) {
          onUserMedia();
        } else {
          video.addEventListener("playing", onUserMedia);
        }

        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [webcamRef, showWebcam]);


  return (
    <div className='fixed inset-0 bg-black/90 z-2000 flex flex-col justify-center items-center w-screen h-screen '>

      <div className='bg-white min-w-xs min-h-fit flex flex-col rounded-lg justify-center gap-3 xs:mx-1 mx-auto p-2 shadow-md'>
        <div >
          <h2 className='font-semibold text-lg text-black'>Details</h2>
        </div>
        <hr className='border-t-2 border-gray-500 ' />
        <div className='flex flex-col gap-1 justify-center items-center'>

          {imgSrc ? <img src={imgSrc} alt="Captured emergency Image" className='w-fit h-fit lg:max-w-md rounded-md' /> :
            <p className='text-black border-2 border-gray-500 border-dashed p-20 ' >No captured photo</p>}

          <Button variant='contained' size='small' className='w-fit' onClick={() => setShowWebcam(true)}>Take photo</Button>
        </div>
        <div className='text-black'>
          <p >Requester : <b>{requester}</b></p>
          <p>Type: <b>{type}</b></p>


        </div>
        <hr className='border-t-2 border-gray-500' />
        <div className='flex justify-end items-center gap-1'>
          <Button variant='contained' color='error' className='w-auto !font-semibold ' onClick={handleDiscard} >Discard</Button>
          <Button variant='contained' className='w-auto !font-semibold !text-white  !bg-green-700' onClick={handleSend}>Send</Button>
        </div>
        {showWebcam &&
          <>
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpg"
              className="h-screen w-screen fixed left-0 top-0 z-2 object-cover"
            />
            {showButton && (
              <button className='h-20 w-20 rounded-full fixed z-3000 bottom-3 self-center border-5 border-white ' onClick={handleClick}></button>

            )}


          </>
        };
      </div>
    </div>

  )
}

export default SubmitModal