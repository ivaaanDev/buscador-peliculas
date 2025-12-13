# 🎬 CineBusca - Buscador de Películas y Series

![Logo](./src/assets/logo.svg)

> Proyecto desarrollado para el **IEEE ESTl Frontend Hackathon**.
> Una interfaz moderna y reactiva para explorar el vasto mundo del cine utilizando la OMDb API.

## 👀 Preview

  https://magical-dieffenbachia-f87d22.netlify.app/

## ✨ Características

- 🔍 **Búsqueda en Tiempo Real**: Encuentra películas, series y episodios.
- ⚡ **Filtros Avanzados**: Refina tu búsqueda por Año y Tipo de contenido.
- 📱 **Diseño 100% Responsivo**: Mobile-first, optimizado para cualquier dispositivo.
- ⭐ **Favoritos Persistentes**: Guarda tu colección personal (LocalStorage).
- 📄 **Paginación Completa**: Navega por miles de resultados sin límites.
- 🎨 **UI Moderna**: Desarrollada con Tailwind CSS y animaciones fluidas.

## 🛠️ Tecnologías

Este proyecto utiliza una arquitectura moderna basada en componentes:

- **Core:** React 18 + Vite (Rendimiento ultra-rápido)
- **Estilos:** Tailwind CSS 3 (Diseño atómico y responsivo)
- **Enrutamiento:** React Router DOM v6
- **Estado Global:** React Context + Hooks Personalizados
- **API:** OMDb API Integration

## 🚀 Instalación y Ejecución

Sigue estos pasos para correr el proyecto localmente:

1. **Clonar el repositorio**
   ```bash
   git clone [URL_DE_TU_REPO_AQUI]
   cd buscador-peliculas

2. **Instalar dependencias**
    ```bash
    npm install

3. **Configurar Variables de Entorno Crea un archivo .env en la raíz basado en .env.example:**
    ```bash
    VITE_OMDB_API_KEY=api_key

4. **Iniciar Servidor de Desarrollo**
    ```bash
    npm run dev