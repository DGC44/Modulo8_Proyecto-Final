const API = 'https://openlibrary.org/search.json';
const COVER_API = 'https://covers.openlibrary.org/b/id/'; // Nueva API para las portadas

export async function fetchLibro(titulo) {
    const encodedTitulo = encodeURIComponent(titulo);
    const url = `${API}?title=${encodedTitulo}`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.docs && data.docs.length > 0) {
            const primerLibro = data.docs[0];
            
            // Construimos la URL de la portada si existe
            let coverUrl = 'https://via.placeholder.com/128x192.png?text=No+Cover'; // Imagen por defecto
            if (primerLibro.cover_i) {
                coverUrl = `${COVER_API}${primerLibro.cover_i}-M.jpg`; // Tamaño mediano (-M)
            }

            return {
                id: primerLibro.key,
                title: primerLibro.title,
                author: primerLibro.author_name ? primerLibro.author_name.join(', ') : 'Desconocido',
                genre: primerLibro.subject ? primerLibro.subject.slice(0, 3).join(', ') : 'Desconocido',
                cover: coverUrl // Agregamos la URL de la portada
            };
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching book:", error);
        return null;
    }
}
