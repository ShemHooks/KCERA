import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';

const RequesterDetails = ({ userId }) => {
  const [name, setName] = useState('');
  const [conNum, setConNum] = useState();
  const [emailAdd, setEmailAdd] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/getSpecificUser/${userId}`);
        const data = await response.json();

        if (response.ok) {
          console.log(data)
          setName(data.data.name);
          setConNum(data.data.phone)
          setEmailAdd(data.data.email)
        } else {
          console.error("Failed to fetch user", data.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  return (
    <div className=''>
      <h2 className=''>Name : {name ? <span className='font-semibold'>{name}</span> : <CircularProgress size={20} />}</h2>
      <h2>Contact : {conNum ? <span className='font-semibold'>{conNum}</span> : <CircularProgress size={20} />} </h2> {/*butangi lang di spinner or ano nga mga loading element*/}
      <h2>Email Address : {emailAdd ? <span className='font-semibold' >{emailAdd}</span> : <CircularProgress size={20} />}</h2>
    </div>
  );
};

export default RequesterDetails;
