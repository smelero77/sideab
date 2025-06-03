import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

type RequestHandler = {
  GET: (event: { params: { genre: string; difficulty: string } }) => Promise<Response>;
};

type Question = {
  imageUrl: string;
  correctTitle: string;
  options: string[];
};

// Configuración de la API de Discogs
const DISCOGS_API_URL = 'https://api.discogs.com';
const DISCOGS_HEADERS = {
  'Authorization': `Discogs token=${env.VITE_DISCOGS_TOKEN}`,
  'User-Agent': 'CoverGuess/1.0'
};

// Mapeo de nuestros géneros a los géneros de Discogs
const genreMap: Record<string, { discogsGenre: string; year: number }> = {
  punk77: { discogsGenre: 'Punk', year: 1977 },
  metal: { discogsGenre: 'Heavy Metal', year: 1986 },
  rock: { discogsGenre: 'Rock', year: 1973 }
};

// Función para obtener álbumes de Discogs
async function getAlbumsFromDiscogs(genre: string, difficulty: 'easy' | 'hard'): Promise<Question[]> {
  try {
    const genreConfig = genreMap[genre];
    if (!genreConfig) {
      throw new Error(`Género no válido: ${genre}`);
    }

    // Construir la URL de búsqueda
    const searchUrl = new URL(`${DISCOGS_API_URL}/database/search`);
    searchUrl.searchParams.append('style', genreConfig.discogsGenre);
    searchUrl.searchParams.append('year', genreConfig.year.toString());
    searchUrl.searchParams.append('type', 'release');
    searchUrl.searchParams.append('per_page', '10');
    searchUrl.searchParams.append('format', 'Vinyl'); // Solo vinilos
    searchUrl.searchParams.append('sort', 'year'); // Ordenar por año
    searchUrl.searchParams.append('sort_order', 'asc'); // Orden ascendente

    console.log('URL de búsqueda:', searchUrl.toString());
    console.log('Headers:', DISCOGS_HEADERS);

    const response = await fetch(searchUrl.toString(), { headers: DISCOGS_HEADERS });

    if (!response.ok) {
      console.error('Respuesta de Discogs:', response.status, response.statusText);
      throw new Error(`Error en la API de Discogs: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Respuesta de Discogs:', JSON.stringify(data, null, 2));
    const releases = data.results || [];

    if (releases.length === 0) {
      console.log('No se encontraron resultados. Intentando búsqueda más amplia...');
      // Si no hay resultados, intentar una búsqueda más amplia
      searchUrl.searchParams.delete('year');
      const broaderResponse = await fetch(searchUrl.toString(), { headers: DISCOGS_HEADERS });
      const broaderData = await broaderResponse.json();
      console.log('Respuesta de búsqueda amplia:', JSON.stringify(broaderData, null, 2));
      const validReleases = broaderData.results
        .filter((release: any) => release.cover_image && release.title)
        .map((release: any) => ({
          imageUrl: release.cover_image,
          correctTitle: release.title,
          options: [release.title]
        }));

      // Para cada release, agregar opciones aleatorias de otros releases
      return validReleases.map((release: Question) => {
        const otherReleases = validReleases.filter((r: Question) => r.correctTitle !== release.correctTitle);
        const randomOptions = otherReleases
          .sort(() => Math.random() - 0.5)
          .slice(0, 4)
          .map((r: Question) => r.correctTitle);
        
        return {
          ...release,
          options: [release.correctTitle, ...randomOptions].sort(() => Math.random() - 0.5)
        };
      });
    }

    // Filtrar y transformar los resultados
    const validReleases = releases
      .filter((release: any) => release.cover_image && release.title)
      .map((release: any) => ({
        imageUrl: release.cover_image,
        correctTitle: release.title,
        options: [release.title]
      }));

    // Para cada release, agregar opciones aleatorias de otros releases
    return validReleases.map((release: Question) => {
      const otherReleases = validReleases.filter((r: Question) => r.correctTitle !== release.correctTitle);
      const randomOptions = otherReleases
        .sort(() => Math.random() - 0.5)
        .slice(0, 4)
        .map((r: Question) => r.correctTitle);
      
      return {
        ...release,
        options: [release.correctTitle, ...randomOptions].sort(() => Math.random() - 0.5)
      };
    });
  } catch (error) {
    console.error('Error al obtener álbumes de Discogs:', error);
    return [];
  }
}

export const GET: RequestHandler['GET'] = async ({ params }) => {
  const { genre, difficulty } = params;
  
  // Validar que el género y la dificultad sean válidos
  if (!Object.keys(genreMap).includes(genre)) {
    return new Response('Género no válido', { status: 400 });
  }
  
  if (!['easy', 'hard'].includes(difficulty)) {
    return new Response('Dificultad no válida', { status: 400 });
  }

  const questions = await getAlbumsFromDiscogs(genre, difficulty as 'easy' | 'hard');
  
  if (!questions || questions.length === 0) {
    return new Response('No hay preguntas disponibles', { status: 404 });
  }
  
  // Seleccionar una pregunta aleatoria
  const randomIndex = Math.floor(Math.random() * questions.length);
  const question = questions[randomIndex];
  
  return json(question);
}; 