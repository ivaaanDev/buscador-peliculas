import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo_n.svg';
import useTheme from '../../hooks/useTheme'; // Importamos el hook

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg border-b transition-colors duration-300
                    bg-white/80 border-gray-200 
                    dark:bg-gray-950/80 dark:border-gray-800">
      
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
           {/* Asegúrate que tu logo SVG tenga colores sólidos o use fill-current para adaptarse */}
          <img src={logoImg} alt="CineBusca" className="h-10 w-auto object-contain" />
          <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white hidden sm:block">
            CineBusca
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <ul className="flex space-x-6 font-medium text-sm items-center">
            <li>
              <Link to="/" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/favoritos" className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
                Favoritos
              </Link>
            </li>
          </ul>

          {/* BOTÓN SWITCH DE TEMA */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-xl"
            title="Cambiar tema"
          >
            {theme === 'dark' ? <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 15q1.25 0 2.125-.875T15 12t-.875-2.125T12 9t-2.125.875T9 12t.875 2.125T12 15m0 1q-1.671 0-2.835-1.164Q8 13.67 8 12t1.165-2.835T12 8t2.836 1.165T16 12t-1.164 2.836T12 16m-7-3.5H1.5v-1H5zm17.5 0H19v-1h3.5zM11.5 5V1.5h1V5zm0 17.5V19h1v3.5zM6.746 7.404l-2.16-2.098l.695-.745l2.111 2.135zM18.72 19.439l-2.117-2.141l.652-.702l2.16 2.098zM16.596 6.745l2.098-2.16l.745.695l-2.135 2.111zM4.562 18.72l2.14-2.117l.664.652l-2.08 2.179zM12 12"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12.741 20.917a9.4 9.4 0 0 1-1.395-.105a9.141 9.141 0 0 1-1.465-17.7a1.18 1.18 0 0 1 1.21.281a1.27 1.27 0 0 1 .325 1.293a8.1 8.1 0 0 0-.353 2.68a8.27 8.27 0 0 0 4.366 6.857a7.6 7.6 0 0 0 3.711.993a1.242 1.242 0 0 1 .994 1.963a9.15 9.15 0 0 1-7.393 3.738M10.261 4.05a.2.2 0 0 0-.065.011a8.137 8.137 0 1 0 9.131 12.526a.22.22 0 0 0 .013-.235a.23.23 0 0 0-.206-.136a8.6 8.6 0 0 1-4.188-1.116a9.27 9.27 0 0 1-4.883-7.7a9.1 9.1 0 0 1 .4-3.008a.29.29 0 0 0-.069-.285a.18.18 0 0 0-.133-.057"/></svg>}
          </button>
        </div>
      </div>
    </nav>
  );
}