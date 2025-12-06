import { useState, useEffect } from 'react';
import { searchMovies } from '../services/omdb';
import MovieCard from '../components/ui/MovieCard';

export default function Home() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');
  const [year, setYear] = useState('');
  const [page, setPage] = useState(1);
  
  const [movies, setMovies] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Carga inicial
  useEffect(() => {
    // Solo buscamos al inicio si no hay query, para llenar la pantalla
    performSearch('Movie', 1);
  }, []);

  // Función centralizada de búsqueda
  const performSearch = async (searchTerm, pageNum = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await searchMovies({ 
        search: searchTerm, 
        type, 
        year, 
        page: pageNum
      });
      
      setMovies(data.movies || []);
      setTotalResults(data.totalResults);
      setPage(pageNum); // Actualizamos la página actual
      
    } catch (e) {
      setError(e.message);
      setMovies([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  // Manejador del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === '') return;
    performSearch(query, 1); // Al buscar de nuevo, siempre volvemos a la página 1
  };

  // Manejador de cambio de página
  const handlePageChange = (newPage) => {
    performSearch(query || 'Movie', newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const totalPages = Math.ceil(totalResults / 10);


  return (
    <div className="space-y-12 py-10">
      
      {/* HERO SECTION */}
      <section className="px-4 text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Busca tu próxima <span className="text-blue-600 dark:text-blue-400">historia</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-lg">
          Explora millones de películas y series en una interfaz limpia y rápida.
        </p>

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="text" 
              placeholder="Ej. Interestelar..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-6 py-4 rounded-2xl text-lg outline-none transition-all
                         bg-white border border-gray-200 text-gray-900 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                         dark:bg-gray-900 dark:border-gray-800 dark:text-white dark:placeholder-gray-500"
            />
            <button 
              type="submit"
              disabled={loading}
              className="px-8 py-4 rounded-2xl font-bold text-white transition-all
                         bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40
                         dark:bg-blue-600 dark:hover:bg-blue-500"
            >
              {loading ? '...' : 'Buscar'}
            </button>
          </div>

          {/* Filtros*/}
          <div className="flex flex-wrap gap-3 justify-center">
            <select 
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="px-4 py-2 rounded-xl text-sm font-medium outline-none cursor-pointer transition-colors
                         bg-white border border-gray-200 text-gray-600 hover:border-gray-300
                         dark:bg-gray-900 dark:border-gray-800 dark:text-gray-300 dark:hover:border-gray-700"
            >
              <option value="">Todo tipo</option>
              <option value="movie">Películas</option>
              <option value="series">Series</option>
              <option value="episode">Episodios</option>
            </select>

            <input 
              type="number" 
              placeholder="Año" 
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-24 px-4 py-2 rounded-xl text-sm font-medium outline-none transition-colors
                         bg-white border border-gray-200 text-gray-600 focus:border-blue-500
                         dark:bg-gray-900 dark:border-gray-800 dark:text-gray-300 dark:focus:border-blue-500"
            />
          </div>
        </form>
      </section>

      {/* RESULTADOS */}
      <section className="container mx-auto px-4">

        {!loading && !error && (
          <>
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {totalResults} resultados encontrados
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
            
            {/*Paginación*/}
            {totalPages > 1 && (
               <div className="flex justify-center items-center gap-4 mt-12">
                 <button 
                   onClick={() => handlePageChange(page - 1)}
                   disabled={page === 1}
                   className="px-5 py-2 rounded-xl text-sm font-medium transition-colors border
                              bg-white border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50
                              dark:bg-gray-900 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800"
                 >
                   Anterior
                 </button>
                 {/* ... */}
                 <button 
                   onClick={() => handlePageChange(page + 1)}
                   disabled={page >= totalPages}
                   className="px-5 py-2 rounded-xl text-sm font-medium transition-colors border
                              bg-white border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50
                              dark:bg-gray-900 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800"
                 >
                   Siguiente
                 </button>
               </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}