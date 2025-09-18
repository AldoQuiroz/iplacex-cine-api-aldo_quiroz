import { ObjectId } from 'mongodb';

export const Pelicula = {
  _id: ObjectId,
  nombre: '',
  géneros: [],
  anioEstreno: 0
};