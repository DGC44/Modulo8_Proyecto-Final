import React, { useState } from 'react';
import { fetchLibro } from '../services/Libros';

function AdminPage({ libros = [], onSetBookOfTheMonth }) {
  const [bookTitle, setBookTitle] = useState('');
  const [reviewText, setReviewText] = useState(''); // Nuevo estado para la reseña
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const datosLibro = await fetchLibro(bookTitle);

    if (datosLibro) {
        // Agregamos la reseña a los datos del libro antes de guardarlos
        const libroConResena = { ...datosLibro, review: reviewText };
        onSetBookOfTheMonth(libroConResena);
        alert(`Se ha configurado "${datosLibro.title}" como el libro del mes.`);
    } else {
        alert('No se encontró el libro. Por favor, intenta de nuevo.');
        onSetBookOfTheMonth(null);
    }
    setLoading(false);
    setBookTitle('');
    setReviewText(''); // Limpiamos el campo de reseña
  };

  return (
    <div className="admin-container">
      <h1>Panel de Administrador</h1>
      <h1>Hora de jugar a ser dios, Ya salio SILKSONG</h1>
      <p>Bienvenido, aquí puedes gestionar el contenido de la aplicación.</p>
      
      <h2>Formulario: Libro del Mes</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="bookTitle">Título del Libro del Mes</label>
          <input
            type="text"
            id="bookTitle"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="reviewText">Reseña del Libro</label>
          <textarea
            id="reviewText"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows="5"
            disabled={loading}
          ></textarea>
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Buscando...' : 'Guardar Libro del Mes'}
        </button>
      </form>

      <div className="libros-container">
        {libros.map((l, i) => (
          <div className="libro-card" key={l.id || i}>
            <div className="libro-cover">
              {l.cover && <img src={l.cover} alt={l.title} />}
            </div>
            <div className="libro-content">
              <h3>{l.title}</h3>
              <p className="libro-info muted">{(l.author || []).join?.(", ") || l.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(AdminPage);