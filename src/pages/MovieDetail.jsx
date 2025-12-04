import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieById } from '../services/omdb';

export default function MovieDetail() {
  const { id } = useParams(); // Obtenemos el ID de la URL (tt12345)
  const navigate = useNavigate();
  
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // 1. Cargar datos de la película
    getMovieById(id)
      .then(data => {
        setMovie(data);
        checkIfFavorite(data.imdbID);
      })
      .catch(err => {
        console.error(err);
        navigate('/'); // Si falla, volver al home
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  // Función auxiliar para revisar si ya está en favoritos
  const checkIfFavorite = (movieId) => {
    const saved = JSON.parse(localStorage.getItem('favorites')) || [];
    // Convertimos a boolean (!!) para saber si existe
    setIsFavorite(!!saved.find(m => m.imdbID === movieId));
  };

  const toggleFavorite = () => {
    const saved = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (isFavorite) {
      // ELIMINAR: Filtramos todos MENOS este
      const newFavorites = saved.filter(m => m.imdbID !== movie.imdbID);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setIsFavorite(false);
    } else {
      // AGREGAR: Guardamos solo lo necesario para la lista (no todo el objeto gigante)
      const movieToSave = {
        imdbID: movie.imdbID,
        Title: movie.Title,
        Poster: movie.Poster,
        Year: movie.Year,
        Type: movie.Type
      };
      saved.push(movieToSave);
      localStorage.setItem('favorites', JSON.stringify(saved));
      setIsFavorite(true);
    }
  };

  if (loading) return <div className="text-white text-center mt-20 text-xl">Cargando detalles...</div>;
  if (!movie) return null;

  // ... imports y lógica

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl animate-fade-in">
      <button onClick={() => navigate(-1)} className="mb-8 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
        ← Volver a resultados
      </button>

      <div className="grid md:grid-cols-[350px_1fr] gap-10 items-start">
        
        {/* POSTER con sombra suave en light mode, sin sombra en dark */}
        <div className="space-y-6">
          <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-900/5 dark:ring-white/10">
             <img 
               src={movie.Poster !== 'N/A' ? movie.Poster : '...'} 
               alt={movie.Title} 
               className="w-full bg-gray-100 dark:bg-gray-800"
             />
          </div>

          <button 
            onClick={toggleFavorite}
            className={`w-full py-4 rounded-xl font-bold text-sm tracking-wide transition-all transform active:scale-95 shadow-lg ${
              isFavorite 
                ? 'bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30' 
                : 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500'
            }`}
          >
            {isFavorite ? '💔 Eliminar de colección' : '⭐ Añadir a colección'}
          </button>
        </div>

        {/* INFO */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
              {movie.Title}
            </h1>
            
            <div className="flex flex-wrap gap-3">
              {/* Tags (Badges) Minimalistas */}
              {[movie.Year, movie.Rated, movie.Runtime, movie.Genre].map((tag, i) => (
                <span key={i} className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider
                                       bg-gray-100 text-gray-600 border border-gray-200
                                       dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* RATINGS */}
          <div className="flex items-center gap-8 py-6 border-y border-gray-100 dark:border-gray-800">
            <div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{movie.imdbRating}</p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">IMDb Rating</p>
            </div>
            {movie.Metascore !== 'N/A' && (
              <div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{movie.Metascore}</p>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Metascore</p>
              </div>
            )}
          </div>

          <div className="space-y-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm uppercase tracking-wide">Sinopsis</h3>
              <p>{movie.Plot}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-sm uppercase tracking-wide">Director</h3>
                <p>{movie.Director}</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-sm uppercase tracking-wide">Elenco</h3>
                <p>{movie.Actors}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}