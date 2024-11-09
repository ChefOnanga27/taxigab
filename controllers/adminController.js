// controllers/adminController.js
import { PrismaClient } from '@prisma/client';
//import bcrypt from 'bcrypt';
//import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET_KEY = 'votre_secret_key';  // À remplacer par une clé secrète sécurisée

// Connexion d'un administrateur
export const adminConnexion = async (req, res) => {
    const { email, motDePasse } = req.body;

    if (!email || !motDePasse) {
        return res.status(400).json({ message: "Email et mot de passe requis." });
    }

    try {
        const admin = await prisma.admin.findUnique({ where: { email } });
        if (!admin || !(await bcrypt.compare(motDePasse, admin.motDePasse))) {
            return res.status(401).json({ message: "Les identifiants de l'admin sont invalides." });
        }
        const token = jwt.sign({ id: admin.id }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la connexion.", error: error.message });
    }
};

// Récupération d'un admin par ID
export const recupererAdminById = async (req, res) => {
    const { id } = req.params;

    try {
        const admin = await prisma.admin.findUnique({ where: { id: Number(id) } });
        if (!admin) {
            return res.status(404).json({ message: "Admin non trouvé." });
        }
        res.json(admin);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de l'admin.", error: error.message });
    }
};


// Récupération de la liste des chauffeurs
export const consulterListeChauffeurs = async (req, res) => {
    try {
        const chauffeurs = await prisma.chauffeur.findMany();
        res.json(chauffeurs);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des chauffeurs.", error: error.message });
    }
};

// Récupération de la liste des taxis
export const consulterListeTaxis = async (req, res) => {
    try {
        const taxis = await prisma.taxi.findMany();
        res.json(taxis);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des taxis.", error: error.message });
    }
};

// Récupération des détails d'un taxi par ID
export const detailTaxiById = async (req, res) => {
    const { id } = req.params;

    try {
        const taxi = await prisma.taxi.findUnique({ where: { id: Number(id) } });
        if (!taxi) {
            return res.status(404).json({ message: "Taxi non trouvé." });
        }
        res.json(taxi);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération du taxi.", error: error.message });
    }
};

// Ajout d'un nouveau taxi
export const ajouterTaxi = async (req, res) => {
    const { plaque, modele } = req.body;

    if (!plaque || !modele) {
        return res.status(400).json({ message: "Plaque et modèle requis." });
    }

    try {
        const taxi = await prisma.taxi.create({
            data: { plaque, modele },
        });
        res.status(201).json(taxi);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'ajout du taxi.", error: error.message });
    }
};

// Désactivation d'un taxi
export const desactiverTaxi = async (req, res) => {
    const { id } = req.params;

    try {
        const taxi = await prisma.taxi.update({
            where: { id: Number(id) },
            data: { statut: "indisponible" },
        });
        res.json({ message: "Taxi désactivé.", taxi });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la désactivation du taxi.", error: error.message });
    }
};

// Mise à jour des informations d'un taxi
export const mettreAjourTaxi = async (req, res) => {
    const { id } = req.params;
    const { plaque, modele, statut } = req.body;

    try {
        const updatedTaxi = await prisma.taxi.update({
            where: { id: Number(id) },
            data: { plaque, modele, statut },
        });
        res.json({ message: "Informations Taxi mises à jour.", updatedTaxi });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour du taxi.", error: error.message });
    }
};

// Création d'une notification
export const creerNotification = async (req, res) => {
    const { message, clientId, chauffeurId } = req.body;

    if (!message || !clientId || !chauffeurId) {
        return res.status(400).json({ message: "Message, clientId et chauffeurId requis." });
    }

    try {
        const notification = await prisma.notification.create({
            data: {
                message,
                clientId,
                chauffeurId,
            },
        });
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la création de la notification.", error: error.message });
    }
};
