const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors()); // Permite peticiones desde el frontend

app.get('/', (req, res) => {
  res.send('Backend funcionando!');
});

// Nueva ruta para libros
app.get('/api/libros', (req, res) => {
  res.json([
    { titulo: 'Libro 1', autor: 'Autor 1' },
    { titulo: 'Libro 2', autor: 'Autor 2' }
  ]);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});