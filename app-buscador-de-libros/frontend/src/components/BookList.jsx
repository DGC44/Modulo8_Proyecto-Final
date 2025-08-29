import React, { useState, useEffect } from "react";
import { fetchBooks } from "../services/service";

const BookList = ({ query }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchBooks(query).then((data) => {
      setLoading(false);
      if (data && data.docs) {
        setBooks(data.docs);
      } else {
        setBooks([]);
      }
    });
  }, [query]);

  return (
    <div>
      <h2>Resultados de búsqueda</h2>
      {loading && <p>Cargando...</p>}
      <ul>
        {books.map((book) => (
          <li key={book.key}>
            <strong>{book.title}</strong>
            {book.author_name && <span> — {book.author_name.join(", ")}</span>}
          </li>
        ))}
      </ul>
      {books.length === 0 && !loading && <p>No se encontraron libros.</p>}
    </div>
  );
};

export default BookList;