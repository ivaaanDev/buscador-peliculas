import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 animate-fade-in">
      <h1 className="text-9xl font-extrabold text-gray-800 dark:text-gray-700">404</h1>
      <div className="absolute bg-blue-500 rounded-full h-2 w-2"></div>
      
      <p className="text-2xl md:text-3xl font-bold text-white mt-4">
        Houston, tenemos un problema.
      </p>
      
      <p className="text-gray-400 mt-4 max-w-md">
        La página que buscas se ha perdido en el espacio o nunca existió.
      </p>

      <Link 
        to="/" 
        className="mt-8 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-transform hover:scale-105 shadow-lg shadow-blue-900/50"
      >
        Volver a la Base
      </Link>
    </div>
  );
}