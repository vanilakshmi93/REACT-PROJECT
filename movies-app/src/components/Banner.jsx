import React from 'react';

const Banner = () => {
  return (
    <div
      className='h-[40vh] bg-cover bg-center md:h-[60vh] bg-no-repeat flex items-end'
      style={{
        backgroundImage: `url('https://petapixel.com/assets/uploads/2023/11/recreate-cinematic-john-wick-movie-poster-feat-800x420.jpg')`
      }}
    >
        <div className='text-xl md:text-3xl bg-gray-900 bg-opacity-50 text-white text-center p-4 w-full'>
            <h3>John Wick</h3>
        </div>
    </div>
    
  );
}

export default Banner;