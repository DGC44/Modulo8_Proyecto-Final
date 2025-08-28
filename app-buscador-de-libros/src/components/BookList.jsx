import React, { useEffect, useState } from "react";
import { fetchBooks } from "../services/service";

const BookList = ({ query = "react" }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBooks = async () => {
      setLoading(true);
      const data = await fetchBooks(query);
      setBooks(data?.docs || []);
      setLoading(false);
    };
    getBooks();
  }, [query]);

  return (
    <div>
      <h2>Resultados para: {query}</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.key}>
              {book.title} {book.author_name ? `- ${book.author_name[0]}` : ""}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookList;