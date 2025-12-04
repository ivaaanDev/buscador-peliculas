const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com';

export const searchMovies = async ({ search, type, page = 1, year }) => {
  if (!search) return null;

  try {
    // Construimos la URL con todos los parámetros opcionales
    const url = new URL(BASE_URL);
    url.searchParams.append('apikey', API_KEY);
    url.searchParams.append('s', search);
    url.searchParams.append('page', page);
    
    if (type) url.searchParams.append('type', type);
    if (year) url.searchParams.append('y', year);

    const response = await fetch(url.toString());
    
    if (!response.ok) throw new Error('Error en la petición');
    
    const data = await response.json();

    if (data.Response === 'False') {
      throw new Error(data.Error);
    }

    return {
      movies: data.Search?.map(movie => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster,
        type: movie.Type
      })),
      totalResults: data.totalResults // <--- ESTO ES ORO PURO PARA LA PAGINACIÓN
    };

  } catch (error) {
    throw new Error(error.message);
  }
};

// ... (código anterior searchMovies)

export const getMovieById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/?apikey=${API_KEY}&i=${id}&plot=full`);
    
    if (!response.ok) throw new Error('Error fetching details');
    
    const data = await response.json();
    
    if (data.Response === 'False') throw new Error(data.Error);

    // Retornamos el objeto tal cual, pero validamos que exista
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};