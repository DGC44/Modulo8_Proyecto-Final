import React, { useCallback } from "react";

function ListaLibros({ titulo, setTitulo, buscarLibro }) {
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      buscarLibro();
    },
    [buscarLibro]
  );

  const handleChange = useCallback(
    (e) => {
      setTitulo(e.target.value);
    },
    [setTitulo]
  );

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="search-input"
        type="text"
        name="titulo"
        id="titulo"
        value={titulo}
        onChange={handleChange}
        placeholder="Buscar título, autor o palabra clave..."
        aria-label="Buscar libros"
      />
      <button className="search-button" type="submit">Buscar</button>
    </form>
  );
}

export default React.memo(ListaLibros);