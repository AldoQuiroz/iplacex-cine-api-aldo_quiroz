
import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './src/common/db.js';
import peliculaRoutes from './src/pelicula/routes.js';
import actorRoutes from './src/actor/routes.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Bienvenido al cine Iplacex');
});

connectToDatabase()
  .then(() => {
    app.use('/api', peliculaRoutes);
    app.use('/api', actorRoutes);

    app.listen(PORT, () => {
      console.log(`✅ Servidor Express escuchando en puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(' No se pudo iniciar el servidor:', error);
  });