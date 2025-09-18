import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../common/db.js';

const peliculaCollection = 'peliculas';

export async function handleInsertPeliculaRequest(req, res) {
  const db = await connectToDatabase();
  const nuevaPelicula = req.body;

  db.collection(peliculaCollection).insertOne(nuevaPelicula)
    .then(() => res.status(201).json({ mensaje: 'Película agregada' }))
    .catch(err => res.status(500).json({ error: err.message }));
}

export async function handleGetPeliculasRequest(req, res) {
  const db = await connectToDatabase();

  db.collection(peliculaCollection).find().toArray()
    .then(peliculas => res.status(200).json(peliculas))
    .catch(err => res.status(500).json({ error: err.message }));
}

export async function handleGetPeliculaByIdRequest(req, res) {
  try {
    const db = await connectToDatabase();
    const id = new ObjectId(req.params.id);

    db.collection(peliculaCollection).findOne({ _id: id })
      .then(pelicula => {
        if (pelicula) res.status(200).json(pelicula);
        else res.status(404).json({ mensaje: 'Película no encontrada' });
      })
      .catch(err => res.status(500).json({ error: err.message }));
  } catch {
    res.status(400).json({ error: 'ID mal formado' });
  }
}

export async function handleUpdatePeliculaByIdRequest(req, res) {
  try {
    const db = await connectToDatabase();
    const id = new ObjectId(req.params.id);
    const actualizacion = { $set: req.body };

    db.collection(peliculaCollection).updateOne({ _id: id }, actualizacion)
      .then(() => res.status(200).json({ mensaje: 'Película actualizada' }))
      .catch(err => res.status(500).json({ error: err.message }));
  } catch {
    res.status(400).json({ error: 'ID mal formado' });
  }
}

export async function handleDeletePeliculaByIdRequest(req, res) {
  try {
    const db = await connectToDatabase();
    const id = new ObjectId(req.params.id);

    db.collection(peliculaCollection).deleteOne({ _id: id })
      .then(() => res.status(200).json({ mensaje: 'Película eliminada' }))
      .catch(err => res.status(500).json({ error: err.message }));
  } catch {
    res.status(400).json({ error: 'ID mal formado' });
  }
}