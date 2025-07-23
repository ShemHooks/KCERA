import React, { useEffect, useState } from 'react';

const GetRequester = ({ id }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchRequester = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/getSpecificUser/${id}`);
        const data = await response.json();

        if (response.ok) {
          console.log(data);
          setName(data.data.name); 
        } else {
          console.error('Failed to fetch requester:', data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (id) {
      fetchRequester();
    }
  }, [id]);

  return (
    <div>
      <span>{name ? name : "Loading..."}</span>
    </div>
  );
};

export default GetRequester;
