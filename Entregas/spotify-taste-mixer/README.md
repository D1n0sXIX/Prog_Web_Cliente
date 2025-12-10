# 🎵 Spotify Taste Mixer

Aplicación web que genera playlists personalizadas de Spotify basándose en las preferencias musicales del usuario mediante widgets configurables.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-19-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC)

---

## 📋 Tabla de Contenidos

- [Características Implementadas](#-características-implementadas)
- [Demo](#-demo)
- [Instalación](#-instalación)
- [Configuración](#%EF%B8%8F-configuración)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Arquitectura y Decisiones Técnicas](#-arquitectura-y-decisiones-técnicas)
- [Widgets Implementados](#-widgets-implementados)
- [Funcionalidades](#-funcionalidades)
- [Despliegue en Vercel](#-despliegue-en-vercel)
- [Enunciado Original](#-enunciado-original-del-proyecto)

---

## ✨ Características Implementadas

### Funcionalidades Obligatorias ✅

| Requisito | Estado | Descripción |
|-----------|--------|-------------|
| OAuth 2.0 | ✅ | Autenticación completa con Spotify |
| Validación CSRF | ✅ | Parámetro `state` validado en callback |
| Token Refresh | ✅ | Renovación automática de tokens expirados |
| Widgets (mín. 3-4) | ✅ | **6 widgets** implementados |
| Generación de Playlist | ✅ | Basada en selecciones de widgets |
| Eliminar Tracks | ✅ | Botón ✕ en cada canción |
| Favoritos (localStorage) | ✅ | Sistema completo con persistencia |
| Refrescar Playlist | ✅ | Botón "Generar Playlist" |
| Diseño Responsive | ✅ | Tailwind CSS con breakpoints |

### Funcionalidades Opcionales Implementadas 🎯

| Funcionalidad | Estado |
|---------------|--------|
| Guardar en Spotify | ✅ Implementado |
| Páginas expandidas de widgets | ✅ Artistas y Canciones |
| Widget de Favoritos | ✅ Bonus extra |

---

## 🚀 Demo

**URL de producción**: [tu-proyecto.vercel.app](https://tu-proyecto.vercel.app) *(actualizar después del deploy)*

---

## 📦 Instalación

### Requisitos Previos

- Node.js 18+
- Cuenta de Spotify
- Aplicación registrada en [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)

### Pasos

```bash
# 1. Clonar repositorio
git clone https://github.com/D1n0sXIX/Prog_Web_Cliente.git
cd Prog_Web_Cliente/Entregas/spotify-taste-mixer

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales

# 4. Ejecutar en desarrollo
npm run dev
```

Abrir [http://127.0.0.1:3000](http://127.0.0.1:3000)

---

## ⚙️ Configuración

### Variables de Entorno

Crea `.env.local` basándote en `.env.example`:

```env
SPOTIFY_CLIENT_ID=tu_client_id
SPOTIFY_CLIENT_SECRET=tu_client_secret
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=tu_client_id
NEXT_PUBLIC_REDIRECT_URI=http://127.0.0.1:3000/auth/callback
```

### Configurar Spotify Dashboard

1. Ve a [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Selecciona tu aplicación
3. Settings → Redirect URIs, añade:
   - `http://127.0.0.1:3000/auth/callback` (desarrollo)
   - `https://tu-proyecto.vercel.app/auth/callback` (producción)

---

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── page.jsx                 # Página de login
│   ├── layout.jsx               # Layout principal
│   ├── globals.css              # Estilos globales + variables CSS
│   ├── dashboard/
│   │   ├── page.jsx             # Dashboard con widgets
│   │   ├── layout.jsx           # Layout con Header y PlaylistFooter
│   │   ├── artistas/page.jsx    # Versión expandida del widget
│   │   ├── canciones/page.jsx   # Versión expandida del widget
│   │   └── guardar/page.jsx     # Guardar playlist en Spotify
│   ├── auth/
│   │   └── callback/page.jsx    # Callback OAuth
│   └── api/
│       ├── spotify-token/route.js    # Intercambio código → token
│       └── refresh-token/route.js    # Refrescar token expirado
├── components/
│   ├── widgets/
│   │   ├── ArtistWidget.jsx     # 🎤 Buscar artistas
│   │   ├── TrackWidget.jsx      # 🎵 Buscar canciones
│   │   ├── GenreWidget.jsx      # 🎸 Seleccionar géneros
│   │   ├── DecadeWidget.jsx     # 📅 Filtrar por décadas
│   │   ├── PopularityWidget.jsx # 📊 Filtrar popularidad
│   │   └── FavoritosWidget.jsx  # ⭐ Ver favoritos guardados
│   ├── Header.jsx               # Navegación y logout
│   ├── PlaylistFooter.jsx       # Footer desplegable con playlist
│   ├── PlaylistDisplay.jsx      # Visualización de playlist
│   └── TrackCard.jsx            # Tarjeta de canción
├── context/
│   └── PlaylistContext.jsx      # Estado global (playlist, favoritos, widgets)
└── lib/
    ├── auth.js                  # Utilidades OAuth (getSpotifyAuthUrl, tokens)
    └── spotify.js               # Funciones API Spotify
```

---

## 🏗️ Arquitectura y Decisiones Técnicas

### 1. Gestión de Estado

**PlaylistContext** centraliza el estado de:
- `playlist` - Canciones de la playlist actual
- `favorites` - Favoritos (persistidos en localStorage)
- `selectedArtists` / `selectedTracks` - Estado compartido entre Dashboard y páginas expandidas

```jsx
// Uso en cualquier componente
const { playlist, addTrack, toggleFavorite, isFavorite } = usePlaylist()
```

### 2. Comunicación Padre-Hijo (Widgets)

Cada widget recibe props del Dashboard:
```jsx
<ArtistWidget 
  selectedArtists={selectedArtists}
  onSelect={setSelectedArtists}
/>
```

### 3. Generación de Playlist (sin /recommendations)

Debido a que el endpoint `/recommendations` está **DEPRECADO**, implementé una estrategia alternativa:

```javascript
const generatePlaylist = async () => {
  let tracks = []

  // 1. Top tracks de artistas seleccionados
  for (const artist of selectedArtists) {
    const artistTracks = await getArtistTopTracks(artist.id)
    tracks.push(...artistTracks)
  }

  // 2. Tracks seleccionados directamente
  tracks.push(...selectedTracks)

  // 3. Búsqueda por género
  for (const genre of selectedGenres) {
    const genreTracks = await searchTracks(`genre:${genre}`, 10)
    tracks.push(...genreTracks)
  }

  // 4. Filtrar por década
  if (selectedDecades.length > 0) {
    tracks = tracks.filter(track => {
      const year = new Date(track.album?.release_date).getFullYear()
      return selectedDecades.some(decade => 
        year >= decade.start && year <= decade.end
      )
    })
  }

  // 5. Filtrar por popularidad
  tracks = tracks.filter(track => 
    track.popularity >= popularityRange.min && 
    track.popularity <= popularityRange.max
  )

  // 6. Eliminar duplicados y mezclar
  const uniqueTracks = [...new Map(tracks.map(t => [t.id, t])).values()]
  const shuffled = uniqueTracks.sort(() => Math.random() - 0.5)
  
  setPlaylist(shuffled.slice(0, 20))
}
```

### 4. Autenticación OAuth 2.0

```
Usuario → Login → Spotify OAuth → Callback → Token Exchange → Dashboard
                                     ↓
                              Validación CSRF (state)
```

- **state** guardado en `sessionStorage` antes de redirigir
- Validado en `callback/page.jsx` antes de intercambiar código
- Tokens guardados en `localStorage`
- Refresh automático cuando expiran

### 5. Diseño Responsive

Layout de widgets en el Dashboard:

```
┌─────────────────────┬─────────────────────┐
│   🎤 Artistas       │   🎵 Canciones      │  ← Fila 1 (2 columnas)
└─────────────────────┴─────────────────────┘
┌───────────┬───────────┬───────────────────┐
│ 📅 Décadas │ 🎸 Géneros │ 📊 Popularidad   │  ← Fila 2 (3 columnas)
└───────────┴───────────┴───────────────────┘
┌───────────────────────────────────────────┐
│              ⭐ Favoritos                  │  ← Fila 3 (1 columna)
└───────────────────────────────────────────┘
              [🎵 Generar Playlist]
```

---

## 🧩 Widgets Implementados

### 1. 🎤 Artist Widget
- Búsqueda con debouncing (300ms)
- Selección múltiple (máximo 5)
- Enlace a versión expandida

### 2. 🎵 Track Widget
- Búsqueda de canciones
- Muestra portada, título, artista
- Enlace a versión expandida

### 3. 🎸 Genre Widget
- Lista hardcodeada de 126 géneros (endpoint deprecated)
- Filtrado por búsqueda
- Selección múltiple (máximo 5)

### 4. 📅 Decade Widget
- Décadas desde 1950s hasta 2020s
- Selección múltiple
- Filtra por año de lanzamiento del álbum

### 5. 📊 Popularity Widget
- Slider dual (mín/máx)
- Categorías: Underground (0-30), Nicho (30-50), Popular (50-70), Mainstream (70-100)

### 6. ⭐ Favoritos Widget
- Muestra canciones guardadas en localStorage
- Botón "Añadir todos" a la playlist
- Quitar de favoritos individualmente

---

## 🎼 Funcionalidades

### Playlist Footer Desplegable

- Footer fijo en la parte inferior
- Click para expandir/colapsar
- Muestra todas las canciones de la playlist
- Botones: ⭐ Favorito, ✕ Eliminar
- Botón "Guardar en Spotify"
- Botón "Limpiar"

### Guardar en Spotify

Página `/dashboard/guardar`:
- Vista previa de la playlist
- Campo para nombre personalizado
- Crea playlist real en tu cuenta de Spotify

### Páginas Expandidas

`/dashboard/artistas` y `/dashboard/canciones`:
- Más espacio para búsqueda
- Grid de resultados
- Ver top tracks de artistas
- Estado sincronizado con Dashboard

---

## 🌐 Despliegue en Vercel

### 1. Subir a GitHub

```bash
git add .
git commit -m "Spotify Taste Mixer - Proyecto Final"
git push origin main
```

### 2. Configurar en Vercel

1. Importar repositorio en [Vercel](https://vercel.com/new)
2. **Root Directory**: `Entregas/spotify-taste-mixer`
3. **Environment Variables**:
   - `SPOTIFY_CLIENT_ID`
   - `SPOTIFY_CLIENT_SECRET`
   - `NEXT_PUBLIC_SPOTIFY_CLIENT_ID`
   - `NEXT_PUBLIC_REDIRECT_URI` → `https://tu-proyecto.vercel.app/auth/callback`

### 3. Actualizar Spotify Dashboard

Añadir Redirect URI de producción:
```
https://tu-proyecto.vercel.app/auth/callback
```

---

## 🔒 Seguridad

- ✅ `SPOTIFY_CLIENT_SECRET` solo en servidor (API Routes)
- ✅ `.env.local` en `.gitignore`
- ✅ Validación CSRF con parámetro `state`
- ✅ Tokens en localStorage (cliente)
- ✅ `.env.example` sin secretos para documentación

---

## 🛠️ Tecnologías

| Tecnología | Uso |
|------------|-----|
| **Next.js 15** | Framework React con App Router |
| **React 19** | Biblioteca UI |
| **Tailwind CSS** | Estilos utility-first |
| **Spotify Web API** | Datos musicales |
| **localStorage** | Persistencia de favoritos |
| **Context API** | Estado global |

---

## 👨‍💻 Autor

**Alejandro** - [GitHub](https://github.com/D1n0sXIX)

Proyecto Final - Programación Web Cliente  
Universidad - Tercer Año - 1er Cuatrimestre

---

## 📝 Enunciado Original del Proyecto

<details>
<summary>Click para ver el enunciado completo del profesor</summary>

### Objetivos del Proyecto

1. Crear una aplicación profesional con Next.js
2. Implementar autenticación OAuth 2.0 de forma segura
3. Trabajar con APIs externas (Spotify Web API)
4. Desarrollar componentes React reutilizables
5. Gestionar estado y persistencia con localStorage
6. Crear una interfaz responsive y atractiva

### Funcionalidades Obligatorias

- OAuth 2.0 authentication flow
- Token refresh automático
- Mínimo 3-4 widgets funcionales
- Generación de playlist basada en widgets
- Eliminar tracks de playlist
- Marcar tracks como favoritos (localStorage)
- Refrescar playlist
- Añadir más canciones
- Diseño responsive

### Funcionalidades Opcionales

- Guardar playlist en Spotify
- Drag & drop para reordenar
- Guardar preferencias de widgets
- Historial de playlists
- Preview de canciones (30s)
- Tests unitarios

### Nota Importante

El endpoint `/recommendations` de Spotify está **DEPRECADO** para nuevas aplicaciones. Se debe usar una estrategia alternativa combinando búsquedas y top tracks.

</details>

---

## 🎨 Desarrollo del Alumno - Estructura Visual

### Esqueleto de la Aplicación

La aplicación está construida con un sistema de **layouts anidados** de Next.js:

```
┌─────────────────────────────────────────────────────────────────┐
│                    RootLayout (src/app/layout.jsx)              │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                         <html>                            │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │                       <body>                        │  │  │
│  │  │                                                     │  │  │
│  │  │   {children} ← Aquí se renderiza cada página        │  │  │
│  │  │                                                     │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### Página de Login (`/`)

```
┌─────────────────────────────────────────────────────────────────┐
│                         page.jsx                                │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                                                           │  │
│  │                    🎵 Spotify Taste Mixer                 │  │
│  │                                                           │  │
│  │                 [Iniciar sesión con Spotify]              │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### Dashboard (`/dashboard`)

```
┌─────────────────────────────────────────────────────────────────┐
│              DashboardLayout (dashboard/layout.jsx)             │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    PlaylistProvider                       │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │                   Header.jsx                        │  │  │
│  │  │   🎵 Spotify Taste Mixer    [Usuario ▼] [Cerrar]    │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │                                                           │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │              {children} - page.jsx                  │  │  │
│  │  │                                                     │  │  │
│  │  │  ┌──────────────────┬──────────────────┐            │  │  │
│  │  │  │  ArtistWidget    │   TrackWidget    │            │  │  │
│  │  │  │  🎤 Artistas     │   🎵 Canciones   │            │  │  │
│  │  │  └──────────────────┴──────────────────┘            │  │  │
│  │  │  ┌────────────┬────────────┬───────────┐            │  │  │
│  │  │  │DecadeWidget│GenreWidget │Popularity │            │  │  │
│  │  │  │ 📅 Décadas │ 🎸 Géneros │ 📊 Widget │            │  │  │
│  │  │  └────────────┴────────────┴───────────┘            │  │  │
│  │  │  ┌─────────────────────────────────────┐            │  │  │
│  │  │  │        FavoritosWidget ⭐            │            │  │  │
│  │  │  └─────────────────────────────────────┘            │  │  │
│  │  │           [🎵 Generar Playlist]                     │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │                                                           │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │              PlaylistFooter.jsx                     │  │  │
│  │  │  ▲ Tu Playlist (5 canciones)              [Guardar] │  │  │
│  │  │  ├─ 🎵 Canción 1 - Artista    [⭐] [✕]              │  │  │
│  │  │  ├─ 🎵 Canción 2 - Artista    [⭐] [✕]              │  │  │
│  │  │  └─ ...                                             │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### Jerarquía de Componentes

```
RootLayout
└── globals.css (Tailwind + variables CSS)
    │
    ├── page.jsx (Login "/")
    │
    └── DashboardLayout ("/dashboard/*")
        └── PlaylistProvider (Context)
            ├── Header
            │   └── Navegación + Usuario + Logout
            │
            ├── {children}
            │   ├── Dashboard (page.jsx)
            │   │   ├── ArtistWidget
            │   │   ├── TrackWidget
            │   │   ├── DecadeWidget
            │   │   ├── GenreWidget
            │   │   ├── PopularityWidget
            │   │   └── FavoritosWidget
            │   │
            │   ├── Artistas (artistas/page.jsx)
            │   ├── Canciones (canciones/page.jsx)
            │   └── Guardar (guardar/page.jsx)
            │
            └── PlaylistFooter
                ├── TrackCard (por cada canción)
                └── PlaylistDisplay
```

### Flujo de Datos (Context)

```
                    PlaylistContext
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
    ┌─────────┐    ┌──────────┐    ┌──────────────┐
    │ Widgets │    │ Dashboard│    │PlaylistFooter│
    │         │───▶│  page    │◀───│              │
    └─────────┘    └──────────┘    └──────────────┘
         │               │               │
         └───────────────┴───────────────┘
                         │
              Estado compartido:
              • playlist
              • favorites  
              • selectedArtists
              • selectedTracks
              • addTrack()
              • removeTrack()
              • toggleFavorite()
              • isFavorite()
```

---

⭐ **¡Gracias por revisar el proyecto!**
