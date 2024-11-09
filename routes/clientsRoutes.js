import express from 'express';
import { 
    inscriptionClient, 
    clientConnexion, 
    demanderUneCourse, 
    consulterDetailCourse, 
    consulterHistoriqueCoursesClient, 
    annulerCourse, 
    consulterProfilClient, 
    mettreAjourProfil, 
    consulterEvaluationsChauffeur, 
    evaluerCourse, 
    ajouterPaiement, 
    consulterNotificationsClients, 
    motDePasseOublier, 
    reinitialiserMotDePasse 
} from '../controllers/clientController.js';
import { verifyToken } from '../middleware/auth.js'; // Assume you have an authentication middleware
import { register,login } from '../controllers/authController.js';

const clientrouter = express.Router();

// Inscription d'un client
clientrouter.post('/inscription',register, inscriptionClient);

// Connexion d'un client
clientrouter.post('/connexion', login,clientConnexion);

// Demande d'une course
clientrouter.post('/course/demander', verifyToken, demanderUneCourse);

// Détails d'une course spécifique
clientrouter.get('/course/:id', verifyToken, consulterDetailCourse);

// Récupération de l'historique des courses pour un client
clientrouter.get('/historique-courses', verifyToken, consulterHistoriqueCoursesClient);

// Annulation d'une course
clientrouter.delete('/course/:id', verifyToken, annulerCourse);

// Récupération du profil
clientrouter.get('/profil', verifyToken, consulterProfilClient);

// Mise à jour du profil
clientrouter.put('/profil', verifyToken, mettreAjourProfil);

// Récupération des évaluations d'un chauffeur
clientrouter.get('/chauffeur/:chauffeurId/evaluations', consulterEvaluationsChauffeur);

// Évaluation d'une course
clientrouter.post('/course/:id/evaluer', verifyToken, evaluerCourse);

// Ajout d'un paiement
clientrouter.post('/paiement', verifyToken, ajouterPaiement);

// Récupération des notifications pour un client
clientrouter.get('/notifications', verifyToken, consulterNotificationsClients);

// Mot de passe oublié
clientrouter.post('/mot-de-passe-oublie', motDePasseOublier);

// Réinitialisation du mot de passe
clientrouter.put('/reinitialiser-mot-de-passe', reinitialiserMotDePasse);

export default clientrouter;
