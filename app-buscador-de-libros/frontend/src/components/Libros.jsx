import React, { useState, useEffect, useCallback, useMemo } from "react";
import { fetchBooks } from "../services/Libros";
import ListaLibros from "./ListaLibros";

function Libros() {
  const [titulo, setTitulo] = useState("javascript");
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async (q) => {
    setLoading(true);
    try {
      const data = await fetchBooks(q);
      setLibros(data?.docs || []);
    } catch (err) {
      console.error(err);
      setLibros([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(titulo);
  }, [titulo, load]);

  const buscarLibro = useCallback(() => {
    load(titulo);
  }, [load, titulo]);

  const items = useMemo(() => {
    return libros.map((b, idx) => ({
      id: b.key || b.cover_edition_key || idx,
      title: b.title || "Sin título",
      author: (b.author_name || []).join(", "),
      year: b.first_publish_year || "",
      coverId: b.cover_i || null,
      link: b.id_goodreads || null
    }));
  }, [libros]);

  return (
    <div>
      <div className="app-header">
        <h1 className="app-title">Buscador Project-Gutenberg style</h1>
      </div>

      <ListaLibros titulo={titulo} setTitulo={setTitulo} buscarLibro={buscarLibro} />

      {loading ? (
        <p className="muted">Cargando resultados...</p>
      ) : (
        <div className="book-list" role="list">
          {items.map(item => (
            <article className="book-item" key={item.id} role="listitem">
              <div className="book-cover" aria-hidden>
                {item.coverId ? (
                  <img src={`https://covers.openlibrary.org/b/id/${item.coverId}-M.jpg`} alt={`Portada de ${item.title}`} />
                ) : null}
              </div>
              <div className="meta">
                <h3>{item.title}</h3>
                <p className="muted">{item.author} {item.year && `• ${item.year}`}</p>
              </div>
              <div className="book-actions">
                <button className="btn-plain btn-primary" onClick={() => window.open(`https://openlibrary.org${item.id}`, "_blank")}>Ver</button>
                <button className="btn-plain" onClick={() => alert('Función no implementada')}>Detalles</button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default Libros;