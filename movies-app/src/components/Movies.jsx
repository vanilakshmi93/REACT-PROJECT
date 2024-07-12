import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from './Pagination'; // Import as default import

function Movies() {
  const [pageNumber, setPageNumber] = useState(1);
  const [movieData, setMovieData] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [hovered, setHovered] = useState('');

  const prevPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prev) => Math.max(prev - 1, 1));
    }
  };

  const nextPage = () => {
    setPageNumber((prev) => prev + 1);
  };

  const getTrendingMovies = () => {
    axios
      .get(`https://api.themoviedb.org/3/trending/movie/day?api_key=b5f5915d07cfe97d0a84ef4fd4717c06&page=${pageNumber}`)
      .then((response) => {
        setMovieData(response.data.results);
      })
      .catch((error) => {
        console.error('Error fetching trending movies:', error);
      });
  };

  useEffect(() => {
    getTrendingMovies();
    const watchlistFromStorage = JSON.parse(localStorage.getItem('imdb') || '[]');
    setWatchlist(watchlistFromStorage);
  }, [pageNumber]);

  const addWatchlist = (movie) => {
    const updatedWatchlist = [...watchlist, movie];
    setWatchlist(updatedWatchlist);
    localStorage.setItem('imdb', JSON.stringify(updatedWatchlist));
  };

  const removeWatchlist = (movie) => {
    const updatedWatchlist = watchlist.filter((item) => item.id !== movie.id);
    setWatchlist(updatedWatchlist);
    localStorage.setItem('imdb', JSON.stringify(updatedWatchlist));
  };

  const isAddedWatchlist = (movie) => {
    return watchlist.some((item) => item.id === movie.id);
  };

  return (
    <>
      <div className='text-2xl font-bold text-center m-8'>Trending Movies</div>
      <div className='flex flex-wrap justify-evenly'>
        {movieData.map((movie) => (
          <div key={movie.id} className='relative m-6'>
            <div
              className='flex items-end w-[200px] bg-center h-[30vh] rounded-xl md:h-[40vh] md:w-[200px] hover:scale-110 duration-75'
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`,
              }}
              onMouseOver={() => setHovered(movie.id)}
              onMouseLeave={() => setHovered('')}
            >
              <div
                className='text-2xl p-1 bg-gray-300 flex items-center justify-center absolute top-2 rounded-xl right-2 w-[30px] h-[30px]'
                style={{ display: hovered === movie.id ? 'flex' : 'none' }}
                onClick={() => (isAddedWatchlist(movie) ? removeWatchlist(movie) : addWatchlist(movie))}
              ><span>
                  {isAddedWatchlist(movie) ? '-' : '+'}
              </span>
              
              </div>
              <div className='text-white font-bold text-center rounded-xl w-full bg-gray-700 bg-opacity-70'>
                {movie.original_title}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Pagination pageNumberProp={pageNumber} onNext={nextPage} onPrev={prevPage} />
      </div>
    </>
  );
}

export default Movies;
  