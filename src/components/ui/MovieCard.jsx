import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
  const hasPoster = movie.poster && movie.poster !== 'N/A';

  return (
    <Link 
      to={`/movie/${movie.id}`} 

      className="group relative rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1
                 bg-white shadow-sm hover:shadow-lg ring-1 ring-gray-200 
                 dark:bg-gray-900 dark:ring-gray-800 dark:shadow-none"
    >
      {/* Contenedor Imagen */}
      <div className="aspect-[2/3] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        {hasPoster ? (
          <img 
            src={movie.poster} 
            alt={movie.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="currentColor" d="m4 4l2 4h3L7 4h2l2 4h3l-2-4h2l2 4h3l-2-4h3q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20H4q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4"/></svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 dark:text-white truncate text-lg">
          {movie.title}
        </h3>
        <div className="flex justify-between items-center mt-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">{movie.year}</p>
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
            {movie.type === 'series' ? 'TV' : 'Movie'}
          </span>
        </div>
      </div>
    </Link>
  );
}