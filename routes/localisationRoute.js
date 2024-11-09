import express from 'express';
import { envoiyerLocalisation, recupererLocalisation } from './controllers/locationController.js';
import { verifyTokenChauffeur } from './middlewares/authMiddleware.js'; 

const router = express.Router();

// Envoi de la localisation pour une course
router.post('/localisation/:id', verifyTokenChauffeur, envoiyerLocalisation);

// Récupération de la localisation en temps réel d'une course
router.get('/localisation/:id', recupererLocalisation);

export default router;
