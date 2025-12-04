import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';

// Componentes temporales (Placeholders) para probar la navegación
// const MovieDetail = () => <div className="p-10 text-center text-2xl">📄 Detalle de Película</div>;
// const Favorites = () => <div className="p-10 text-center text-2xl">⭐ Mis Favoritos</div>;
// const NotFound = () => <div className="p-10 text-center text-2xl text-red-500">404 - No encontrado</div>;

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <Navbar />
        
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/favoritos" element={<Favorites />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        {/* Footer sencillo */}
        <footer className="text-center py-6 text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} CineBusca - Hackathon IEEE
        </footer>
      </div>
    </BrowserRouter>
  );
}