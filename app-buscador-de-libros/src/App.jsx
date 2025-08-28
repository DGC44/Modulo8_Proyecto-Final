import { useState } from "react";
import BookList from "./components/BookList";
import './App.css';

function App() {
  const [search, setSearch] = useState("javascript");

  return (
    <div className="app-container">
      <h1>Buscador de Libros</h1>
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Buscar libro..."
      />
      <BookList query={search} />
    </div>
  );
}

export default App;