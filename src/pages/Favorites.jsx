import { useState, useEffect } from 'react';
import MovieCard from '../components/ui/MovieCard';
import { Link } from 'react-router-dom';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Leemos del localStorage al entrar a la página
    const saved = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(saved);
  }, []);

  const removeFavorite = (imdbID) => {
    // 1. Filtrar el array para quitar el elemento
    const newFavorites = favorites.filter(movie => movie.imdbID !== imdbID);
    
    // 2. Actualizar estado (para que desaparezca visualmente al instante)
    setFavorites(newFavorites);
    
    // 3. Actualizar localStorage (para que persista)
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  

  if (favorites.length === 0) {
    return (
      <div className="text-center py-24 px-4">
      <div className="place-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="5em" height="5em" viewBox="0 0 256 256"><path fill="currentColor" d="m198.24 62.63l15.68-17.25a8 8 0 0 0-11.84-10.76L186.4 51.86A95.95 95.95 0 0 0 57.76 193.37l-15.68 17.25a8 8 0 1 0 11.84 10.76l15.68-17.24A95.95 95.95 0 0 0 198.24 62.63M48 128a80 80 0 0 1 127.6-64.25l-107 117.73A79.63 79.63 0 0 1 48 128m80 80a79.55 79.55 0 0 1-47.6-15.75l107-117.73A79.95 79.95 0 0 1 128 208"/>
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Colección vacía</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">
        No has guardado nada aún. Busca películas y agrégalas aquí.
      </p>
      <Link to="/" className="inline-block px-8 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors">
        Explorar
      </Link>
    </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Tu Colección
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {favorites.map(movie => (
          <div key={movie.imdbID} className="relative group">
            {/* Reutilizamos la tarjeta, pero ajustamos el ID porque OMDb usa 'imdbID' en los detalles y 'id' en búsqueda */}
            <MovieCard movie={{ ...movie, id: movie.imdbID, poster: movie.Poster, title: movie.Title, year: movie.Year, type: movie.Type }} />
            
            <button 
              onClick={(e) => {
                e.preventDefault();
                removeFavorite(movie.imdbID);
              }}
              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
              title="Eliminar de favoritos"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"/></svg> 
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}