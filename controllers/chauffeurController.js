import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Connexion d'un chauffeur
export const chauffeurConnexion = async (req, res) => {
    const { email, motDePasse } = req.body;

    try {
        const chauffeur = await prisma.chauffeur.findUnique({ where: { email } });
        if (!chauffeur || chauffeur.motDePasse !== motDePasse) {
            return res.status(401).json({ message: "Identifiants invalides." });
        }
        const token = jwt.sign({ id: chauffeur.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la connexion.", error });
    }
};

// Consulte le profil du chauffeur
export const consulterProfilChauffeur = async (req, res) => {
    const chauffeurId = req.user.id;

    try {
        const chauffeur = await prisma.chauffeur.findUnique({ where: { id: chauffeurId } });
        if (!chauffeur) {
            return res.status(404).json({ message: "Chauffeur non trouvé." });
        }
        res.json(chauffeur);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération du profil.", error });
    }
};

// Liste des évaluations du chauffeur
export const consulterEvaluations = async (req, res) => {
    const chauffeurId = req.user.id;

    try {
        const evaluations = await prisma.evaluation.findMany({
            where: { chauffeurId },
            orderBy: { createdAt: 'desc' },
        });
        res.json(evaluations);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des évaluations.", error });
    }
};

// Liste des demandes de course
export const consulterListeCourse = async (req, res) => {
    const chauffeurId = req.user.id;

    try {
        const demandes = await prisma.course.findMany({
            where: { chauffeurId, statut: "en attente" },
            include: { client: true },
        });
        res.json(demandes);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des demandes de course.", error });
    }
};

// Acceptation d'une course
export const accepterCourse = async (req, res) => {
    const { id } = req.params;
    const chauffeurId = req.user.id;

    try {
        const course = await prisma.course.findUnique({ where: { id: Number(id) } });
        if (!course || course.chauffeurId !== chauffeurId || course.statut !== "en attente") {
            return res.status(404).json({ message: "Course non trouvée ou déjà acceptée." });
        }

        const updatedCourse = await prisma.course.update({
            where: { id: Number(id) },
            data: { statut: "en cours" },
        });
        res.json(updatedCourse);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'acceptation de la course.", error });
    }
};

// Marquer une course comme indisponible
export const courseIndisponible = async (req, res) => {
    const { id } = req.params;
    const chauffeurId = req.user.id;

    try {
        const course = await prisma.course.findUnique({ where: { id: Number(id) } });
        if (!course || course.chauffeurId !== chauffeurId) {
            return res.status(404).json({ message: "Course non trouvée." });
        }

        const updatedCourse = await prisma.course.update({
            where: { id: Number(id) },
            data: { statut: "indisponible" },
        });
        res.json(updatedCourse);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour du statut de la course.", error });
    }
};

// Envoi de la position du chauffeur
export const envoyerPosition = async (req, res) => {
    const { latitude, longitude } = req.body;
    const chauffeurId = req.user.id;

    try {
        const updatedChauffeur = await prisma.chauffeur.update({
            where: { id: chauffeurId },
            data: { latitude, longitude },
        });
        res.json(updatedChauffeur);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'envoi de la position.", error });
    }
};

// Historique des courses du chauffeur
export const consulterHistoriqueCourses = async (req, res) => {
    const chauffeurId = req.user.id;

    try {
        const historique = await prisma.course.findMany({
            where: { chauffeurId },
            include: { client: true },
            orderBy: { id: 'desc' },
        });
        res.json(historique);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de l'historique des courses.", error });
    }
};

// Récupérer les notifications pour un chauffeur
export const consulterNotificationsChauffeur = async (req, res) => {
    const chauffeurId = req.user.id;

    try {
        const notifications = await prisma.notification.findMany({
            where: { chauffeurId },
            orderBy: { createdAt: 'desc' },
        });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des notifications.", error });
    }
};
