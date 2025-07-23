import React, { useState, useEffect } from 'react';
import RequesterDetails from '../services/RequesterDetails';
import RoutingMap from './RoutingMap';
import ImagePreview from './ImagePreview';
import { Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const EmergencyDetails = ({ details, from, historyId  }) => {

  const [requesterId, setRequesterId] = useState(null);
  const [to, setTo] = useState([]);
  const [imgData, setImgData] = useState();
  const [viewLocation, setVewLocation] = useState(false)

  useEffect(() => {

    if (details) {
      setRequesterId(details.user_id);
      setTo([details.latitude, details.longitude]);
      setImgData(details.request_photo);
    }
  }, [details]);

  return (
    <>
      {requesterId ? (
        <div className="rounded-lg shadow-[0px_0px_12px_-4px_rgba(0,_0,_0,_0.7)] sm:max-w-full mx-5 mt-12  md:mt-10 md:mx-4 sm:mx-45 ">
          <h1 className='text-center text-2xl font-bold uppercase  mb-3 mx-4  tracking-wide  text-gray-600 md:py-2 md:text-3xl  mt-3'>Emergency Details</h1>
          <div className="p-2 border-t border-gray-400 m-2 ">
              {/* Bag o ni */}
              <div><h1>Report No: {historyId}</h1></div>
            <div className="px-2 gap-2 sm:flex justify-center items-center md:h-100 md:w-150   ">

              <div className='p-2 w-full max-h-full'>
                <ImagePreview imageData={imgData} />
              </div>
              <RequesterDetails userId={requesterId} />
            </div>
            <div className='flex justify-end m-2'>
              <Button
                variant='contained' onClick={() => setVewLocation(true)} >View location</Button>
            </div>
          </div>
          {viewLocation && (
            <div className=" w-screen h-screen fixed top-0 left-0 flex flex-col justify-center items-center bg-black  ">
              <RoutingMap to={to} from={from} />

              <div className='bg-white shadow-lg w-full absolute top-0 left-0 z-3000 px-2 py-1'>
                <button className=' p-0.5 md:p-2 rounded-sm md:w-2xs  md:text-2xl text-black font-semibold z-0 ' onClick={() => setVewLocation(false)} ><ArrowBack /></button>
              </div>
            </div>
          )}
        </div>

      ) : (
        <div className="">
          No task yet
        </div>
      )
      }
    </ >


  );
};

export default EmergencyDetails;
