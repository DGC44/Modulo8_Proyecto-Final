import React, { useState } from "react";
import BookList from "./components/BookList";
import './App.css';

function App() {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="app-container">
      <h1>Buscador de Libros</h1>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Buscar libros..."
      />
      <BookList query={query} />
    </div>
  );
}

export default App;