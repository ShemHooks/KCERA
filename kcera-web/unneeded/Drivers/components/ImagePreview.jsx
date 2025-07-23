import React from 'react';

const ImagePreview = ({ imageData }) => {
  return (
    <>
      <img
        src={imageData}
        alt="Photo of submitted emergency"
        className='w-sm h-sm rounded-lg  '
      />
    </>

  );
};

export default ImagePreview;
