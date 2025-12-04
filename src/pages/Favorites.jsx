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
      <div className="text-6xl mb-6">📂</div>
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
            
            {/* Botón de Eliminar flotante (Solo visible en esta página) */}
            <button 
              onClick={(e) => {
                e.preventDefault(); // Evitamos que el click navegue al detalle
                removeFavorite(movie.imdbID);
              }}
              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
              title="Eliminar de favoritos"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}