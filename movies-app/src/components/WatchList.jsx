import React, { useEffect, useState } from 'react';

// Correct mapping of genre IDs to names based on the JSON object you provided
const genresIds = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western"
};

const Watchlist = () => {
  const [favorites, setFavorites] = useState([]);
  const [filteredFavorites, setFilteredFavorites] = useState([]);
  const [genere, setGenere] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); // State to manage sorting order

  useEffect(() => {
    const watchlistFromStorage = JSON.parse(localStorage.getItem('imdb') || '[]');
    setFavorites(watchlistFromStorage);
    setFilteredFavorites(watchlistFromStorage);
    console.log(watchlistFromStorage);  // Log the fetched data
  }, []);

  useEffect(() => {
    let listofGenreIDsofMovies = favorites.map(movie => movie.genre_ids);
    console.log(listofGenreIDsofMovies);

    let listOfGenresOfAllMovies = listofGenreIDsofMovies.reduce((acc, t) => {
      let genreNames = t.map(genreId => genresIds[genreId]);
      console.log(genreNames);
      acc = [...acc, ...genreNames];
      return acc;
    }, []);

    console.log("All genres:", listOfGenresOfAllMovies);
    let listofUniqueness = Array.from(new Set(listOfGenresOfAllMovies));
    console.log("Unique genres:", listofUniqueness);
    setGenere(listofUniqueness);
  }, [favorites]);

  const filterByGenre = (genre) => {
    if (genre === "All Genres") {
      setFilteredFavorites(favorites);
    } else {
      const filteredMovies = favorites.filter(movie =>
        movie.genre_ids.some(genreId => genresIds[genreId] === genre)
      );
      setFilteredFavorites(filteredMovies);
    }
  };

  const sortFavoritesByRating = () => {
    const sortedFavorites = [...filteredFavorites].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.vote_average - b.vote_average;
      } else {
        return b.vote_average - a.vote_average;
      }
    });
    setFilteredFavorites(sortedFavorites);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sorting order
  };

  const genereFilter = () => {
    return (
      <>
        <button
          key="All Genres"
          className="m-2 p-2 bg-blue-500 text-white rounded"
          onClick={() => filterByGenre("All Genres")}
        >
          All Genres
        </button>
        {genere.map(g => (
          <button
            key={g}
            className="m-2 p-2 bg-blue-500 text-white rounded"
            onClick={() => filterByGenre(g)}
          >
            {g}
          </button>
        ))}
      </>
    );
  };

  const getMoviesRow = (movie) => {
    const imageUrl = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
    const genreNames = movie.genre_ids.map(id => genresIds[id]).join(', ');
    return (
      <tr key={movie.id}>
        <td className='pl-6 py-4'>
          <img src={imageUrl} alt={movie.original_title} className='w-20 h-auto' />
        </td>
        <td className='pl-6 py-4'>
          <div>{movie.original_title}</div>
        </td>
        <td className='pl-6 py-4'>{movie.vote_average}</td>
        <td className='pl-6 py-4'>{movie.popularity}</td>
        <td className='pl-6 py-4'>{genreNames}</td>
      </tr>
    );
  };

  return (
    <div className='overflow-hidden m-5 border border-gray-200'>
      <div className='flex justify-center'>
        <button
          className="m-2 p-2 bg-blue-500 text-white rounded"
          onClick={sortFavoritesByRating}
        >
          Sort by Rating ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
        </button>
        {genereFilter()}
      </div>
      <table className='w-full p-4 border-gray-400 shadow-md text-left text-sm'>
        <thead className='bg-gray-50'>
          <tr>
            <th className='px-6 py-4 font-medium'>Poster</th>
            <th className='px-6 py-4 font-medium'>Name</th>
            <th className='px-6 py-4 font-medium'>Rating</th>
            <th className='px-6 py-4 font-medium'>Popularity</th>
            <th className='px-6 py-4 font-medium'>Genre</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-100 border-gray-100'>
          {filteredFavorites.map(movie => getMoviesRow(movie))}
        </tbody>
      </table>
    </div>
  );
};

export default Watchlist;