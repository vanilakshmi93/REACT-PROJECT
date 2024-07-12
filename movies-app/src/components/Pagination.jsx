
import React from 'react';

const Pagination = ({ pageNumberProp, onNext, onPrev }) => {
  return (
    <div className="flex justify-center">
      <div onClick={onPrev} className='m-4 p-2 border-2 cursor-pointer'>
        Previous
      </div>
      <div className='m-4 p-2 border-2'>
        {pageNumberProp}
      </div>
      <div onClick={onNext} className='m-4 p-2 border-2 cursor-pointer'>
        Next
      </div>
    </div>
  );
};

export default Pagination; // Default export