export default function ListaLibros({ titulo, setTitulo, buscarLibro }) {
    
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita que la página se recargue
        buscarLibro();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="titulo" 
                id="titulo" 
                value={titulo} 
                onChange={(e) => setTitulo(e.target.value)} 
                placeholder="Ingresa el título del libro"
            />
            <button type="submit">Buscar</button>
        </form>
    )
}