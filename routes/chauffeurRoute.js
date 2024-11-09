import express from 'express';
import asyncHandler from 'express-async-handler';
import { 
    chauffeurConnexion, 
    consulterProfilChauffeur, 
    consulterEvaluations, 
    consulterListeCourse, 
    accepterCourse, 
    courseIndisponible, 
    envoyerPosition, 
    consulterHistoriqueCourses, 
    consulterNotificationsChauffeur 
} from '../controllers/chauffeurController.js';
import { verifyToken } from '../middleware/auth.js'; // Assuming you have an authentication middleware
import { login } from '../controllers/authController.js';

const chauffeurrouter = express.Router();

// Connexion d'un chauffeur
chauffeurrouter.post('/connexion',login, chauffeurConnexion);

// Consulte le profil
chauffeurrouter.get('/profil', verifyToken, consulterProfilChauffeur);

// Liste des évaluations
chauffeurrouter.get('/evaluations', verifyToken, consulterEvaluations);

// Liste des demandes de course
chauffeurrouter.get('/demandes', verifyToken, consulterListeCourse);

// Acceptation d'une course
chauffeurrouter.put('/course/:id/accepter', verifyToken, accepterCourse);

// Indisponible pour une course
chauffeurrouter.put('/course/:id/indisponible', verifyToken, courseIndisponible);

// Envoi de localisation
chauffeurrouter.post('/position', verifyToken, envoyerPosition);

// Historique des courses
chauffeurrouter.get('/historique-courses', verifyToken, consulterHistoriqueCourses);

// Récupération des notifications pour un chauffeur
chauffeurrouter.get('/notifications', verifyToken, consulterNotificationsChauffeur);

export default chauffeurrouter;
