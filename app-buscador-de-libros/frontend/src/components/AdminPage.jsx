import { useState } from 'react';
import { fetchLibro } from '../services/Libros';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import imgSherma from '../assets/Npc_sherma.webp';

export default function AdminPage({ onSetBookOfTheMonth }) {
  const [bookTitle, setBookTitle] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Inicializa el hook de navegación

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const datosLibro = await fetchLibro(bookTitle);

    if (datosLibro) {
        const libroConResena = { ...datosLibro, review: reviewText };
        onSetBookOfTheMonth(libroConResena);
        alert(`Se ha configurado "${datosLibro.title}" como el libro del mes.`);
    } else {
        alert('No se encontró el libro. Por favor, intenta de nuevo.');
        onSetBookOfTheMonth(null);
    }
    setLoading(false);
    setBookTitle('');
    setReviewText('');
  };

  const handleManageUsersClick = () => {
    navigate('/admin/users'); // Redirige a la nueva ruta
  };

  return (
    <div className="admin-container">
      <h1>Panel de Administrador</h1>
      <h1>Panel de Administrador</h1>
      <h2>Eres el Admin eres dios, Ya salio Silksong</h2>
      <img src={imgSherma} alt="Imagen de Hollow Knight Silksong" style={{ maxWidth: '200px', margin: '20px 0' }} />
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

      {/* Nuevo botón para la gestión de usuarios */}
      <button onClick={handleManageUsersClick} className="manage-users-btn">
        Gestionar Clientes
      </button>
    </div>
  );
}