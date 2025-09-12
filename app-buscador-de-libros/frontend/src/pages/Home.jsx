import React, { useState } from 'react';
import { fetchBooks } from '../services/service';

const Home = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const handleSearch = async () => {
    const data = await fetchBooks(query);
    if (data && data.docs) {
      setBooks(data.docs);
    }
  };

  return (
    <div>
      <h2>Buscar Libros</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Escribe el título del libro"
      />
      <button onClick={handleSearch}>Buscar</button>
      <ul>
        {books.map((book) => (
          <li key={book.key}>
            <strong>{book.title}</strong> - {book.author_name?.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;