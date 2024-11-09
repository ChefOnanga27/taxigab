import express from 'express';
import { envoyerLocalisation, recupererLocalisation } from '../controllers/localisationController.js';
import { verifyToken } from '../middleware/auth.js'; // Assuming you have a middleware to verify driver tokens

const localisationrouter = express.Router();

// Envoi de la localisation pour une course
localisationrouter.post('/localisation/:id', verifyToken,envoyerLocalisation);

// Récupération de la localisation en temps réel d'une course
localisationrouter.get('/localisation/:id', recupererLocalisation);

export default localisationrouter;
