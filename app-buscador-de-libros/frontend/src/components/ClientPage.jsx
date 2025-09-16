import React, { useState } from 'react';
import ListaLibros from './ListaLibros';
import Libros from './Libros';
import { fetchLibro } from '../services/Libros';

function ClientPage({ bookOfTheMonth, libros = [] }) {
  const [titulo, setTitulo] = useState('');
  const [librosEncontrados, setLibrosEncontrados] = useState([]);

  const buscarLibro = async () => {
    if (titulo.trim() === '') {
      alert('Por favor, ingresa un título.');
      return;
    }
    const datosLibro = await fetchLibro(titulo);
    if (datosLibro) {
        setLibrosEncontrados((prevLibros) => [...prevLibros, datosLibro]);
        setTitulo('');
    } else {
        alert('No se encontró el libro. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="client-container">
      {bookOfTheMonth && (
        <div className="book-of-the-month">
            <h2>Libro del Mes</h2>
            <div className="book-info-container">
                <img src={bookOfTheMonth.cover} alt={`Portada de ${bookOfTheMonth.title}`} />
                <div className="book-info-text">
                    <h3>{bookOfTheMonth.title}</h3>
                    <p>Autor: {bookOfTheMonth.author}</p>
                    <p>Género: {bookOfTheMonth.genre}</p>
                    <a href={`https://openlibrary.org${bookOfTheMonth.id}`} target="_blank" rel="noopener noreferrer">Ver detalles del libro</a>
                </div>
            </div>
            {/* Sección de la reseña */}
            <div className="book-review">
                <h3>Nuestra Reseña</h3>
                <p>{bookOfTheMonth.review}</p>
            </div>
        </div>
      )}

      <h1>Buscador de Libros</h1>
      <ListaLibros 
        titulo={titulo} 
        setTitulo={setTitulo} 
        buscarLibro={buscarLibro} 
      />
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
      <Libros libros={librosEncontrados} />
    </div>
  );
}

export default React.memo(ClientPage);