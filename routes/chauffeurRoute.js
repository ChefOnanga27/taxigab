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
import { verifyToken } from '../middlewares/auth.js'; 

const router = express.Router();

// Connexion d'un chauffeur
router.post('/connexion', asyncHandler(chauffeurConnexion));

// Consulte le profil
router.get('/profil', verifyToken, asyncHandler(consulterProfilChauffeur));

// Liste des évaluations
router.get('/evaluations', verifyToken, asyncHandler(consulterEvaluations));

// Liste des demandes de course
router.get('/demandes', verifyToken, asyncHandler(consulterListeCourse));

// Acceptation d'une course
router.put('/course/:id/accepter', verifyToken, asyncHandler(accepterCourse));

// Indisponible pour une course
router.put('/course/:id/indisponible', verifyToken, asyncHandler(courseIndisponible));

// Envoi de localisation
router.post('/position', verifyToken, asyncHandler(envoyerPosition));

// Historique des courses
router.get('/historique-courses', verifyToken, asyncHandler(consulterHistoriqueCourses));

// Récupération des notifications pour un chauffeur
router.get('/notifications', verifyToken, asyncHandler(consulterNotificationsChauffeur));

export default router;

