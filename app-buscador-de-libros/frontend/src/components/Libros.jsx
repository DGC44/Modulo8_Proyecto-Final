export default function Libros({ libros }) {
    return (
        <div className="libros-container">
            {libros.map((libro) => (
                <div key={libro.id} className="libro-card">
                    {/* Contenedor para la información y la imagen */}
                    <div className="libro-content">
                        <div className="libro-info">
                            <h3>Título: {libro.title}</h3>
                            <p>Autor: {libro.author}</p>
                            <p>Género: {libro.genre}</p>
                        </div>
                        <div className="libro-cover">
                            <img src={libro.cover} alt={`Portada de ${libro.title}`} />
                        </div>
                    </div>
                    <hr /> {/* Línea para separar cada libro */}
                </div>
            ))}
        </div>
    )
}