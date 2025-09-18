
import express from 'express';
import {
  handleInsertActorRequest,
  handleGetActoresRequest,
  handleGetActorByIdRequest,
  handleUpdateActorByIdRequest,
  handleDeleteActorByIdRequest
} from './controller.js';

const actorRoutes = express.Router();

// Ruta de prueba solo para GET
actorRoutes.get('/actor', (req, res) => {
  res.json({ mensaje: 'Ruta de actor funcionando correctamente' });
});

// CRUD real
actorRoutes.post('/actor', handleInsertActorRequest);
actorRoutes.get('/actores', handleGetActoresRequest);
actorRoutes.get('/actor/:id', handleGetActorByIdRequest);
actorRoutes.put('/actor/:id', handleUpdateActorByIdRequest);
actorRoutes.delete('/actor/:id', handleDeleteActorByIdRequest);

export default actorRoutes;