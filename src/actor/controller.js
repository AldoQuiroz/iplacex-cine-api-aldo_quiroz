import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../common/db.js';

const actorCollection = 'actores';

export async function handleInsertActorRequest(req, res) {
  const db = await connectToDatabase();
  const nuevoActor = req.body;

  db.collection(actorCollection).insertOne(nuevoActor)
    .then(() => res.status(201).json({ mensaje: 'Actor agregado' }))
    .catch(err => res.status(500).json({ error: err.message }));
}

export async function handleGetActoresRequest(req, res) {
  const db = await connectToDatabase();

  db.collection(actorCollection).find().toArray()
    .then(actores => res.status(200).json(actores))
    .catch(err => res.status(500).json({ error: err.message }));
}

export async function handleGetActorByIdRequest(req, res) {
  try {
    const db = await connectToDatabase();
    const id = new ObjectId(req.params.id);

    db.collection(actorCollection).findOne({ _id: id })
      .then(actor => {
        if (actor) res.status(200).json(actor);
        else res.status(404).json({ mensaje: 'Actor no encontrado' });
      })
      .catch(err => res.status(500).json({ error: err.message }));
  } catch {
    res.status(400).json({ error: 'ID mal formado' });
  }
}

export async function handleUpdateActorByIdRequest(req, res) {
  try {
    const db = await connectToDatabase();
    const id = new ObjectId(req.params.id);
    const actualizacion = { $set: req.body };

    db.collection(actorCollection).updateOne({ _id: id }, actualizacion)
      .then(() => res.status(200).json({ mensaje: 'Actor actualizado' }))
      .catch(err => res.status(500).json({ error: err.message }));
  } catch {
    res.status(400).json({ error: 'ID mal formado' });
  }
}

export async function handleDeleteActorByIdRequest(req, res) {
  try {
    const db = await connectToDatabase();
    const id = new ObjectId(req.params.id);

    db.collection(actorCollection).deleteOne({ _id: id })
      .then(() => res.status(200).json({ mensaje: 'Actor eliminado' }))
      .catch(err => res.status(500).json({ error: err.message }));
  } catch {
    res.status(400).json({ error: 'ID mal formado' });
  }
}