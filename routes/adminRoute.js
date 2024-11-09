import express from 'express';
import asyncHandler from 'express-async-handler';
import { 

    consulterListeChauffeurs, 
    consulterListeTaxis, 
    detailTaxiById, 
    ajouterTaxi, 
    desactiverTaxi, 
    mettreAjourTaxi, 
    creerNotification } from '../controllers/adminController.js';
//import { verifyToken } from '../middleware/auth.js';

const router = express.Router();


// Gestion des chauffeurs
router.get('/chauffeurs',asyncHandler(consulterListeChauffeurs));

// Récupération de la liste des taxis
router.get('/taxis', asyncHandler(consulterListeTaxis));

// Détails d'un taxi par ID
router.get('/taxi/:id', asyncHandler(detailTaxiById));

// Ajout d'un nouveau taxi
router.post('/taxi', asyncHandler(ajouterTaxi));

// Désactivation d'un taxi par ID
router.put('/taxi/:id/desactiver', asyncHandler(desactiverTaxi));

// Mise à jour des informations d'un taxi par ID
router.put('/taxi/:id', asyncHandler(mettreAjourTaxi));

// Création d'une notification
router.post('/notification', asyncHandler(creerNotification));

export default router;
