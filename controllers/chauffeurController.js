import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Connexion d'un chauffeur
export const chauffeurConnexion = async (req, res) => {
    const { email, motDePasse } = req.body;

    try {
        const chauffeur = await prisma.chauffeur.findUnique({ where: { email } });
        if (!chauffeur || !(await bcrypt.compare(motDePasse, chauffeur.motDePasse))) {
            return res.status(401).json({ message: "Identifiants invalides." });
        }
        const token = jwt.sign({ id: chauffeur.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la connexion.", error });
    }
};

// Consulte le profil
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

// Liste des évaluations
export const consulterEvaluations = async (req, res) => {
    try {
        const evaluations = await prisma.course.findMany({
            where: { chauffeurId: req.user.id },
            select: { id: true, statut: true, client: { select: { nom: true, prenom: true } } },
        });
        res.json(evaluations);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des évaluations.", error });
    }
};

// Liste des demandes de course
export const consulterListeCourse = async (req, res) => {
    try {
        const demandes = await prisma.course.findMany({
            where: { statut: "en attente" },
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

    try {
        const course = await prisma.course.findUnique({ where: { id: Number(id) } });
        if (!course) {
            return res.status(404).json({ message: "Course non trouvée." });
        }
        const updatedCourse = await prisma.course.update({
            where: { id: Number(id) },
            data: { chauffeurId: req.user.id, statut: "acceptée" },
        });
        res.json(updatedCourse);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'acceptation de la course.", error });
    }
};

// Indisponible pour une course
export const courseIndisponible = async (req, res) => {
    const { id } = req.params;

    try {
        const course = await prisma.course.findUnique({ where: { id: Number(id) } });
        if (!course) {
            return res.status(404).json({ message: "Course non trouvée." });
        }
        await prisma.course.update({
            where: { id: Number(id) },
            data: { statut: "indisponible" },
        });
        res.json({ message: "Course marquée comme indisponible." });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour de la course.", error });
    }
};

// Envoi de localisation
export const envoyerPosition = async (req, res) => {
    const { latitude, longitude } = req.body;

    // Validation des coordonnées
    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
        return res.status(400).json({ message: "Latitude et longitude doivent être des nombres." });
    }

    try {
        // Enregistrer la localisation dans la base de données
        const localisation = await prisma.localisation.create({
            data: {
                chauffeurId: req.user.id,
                latitude,
                longitude,
            },
        });
        res.json({ message: "Localisation reçue.", localisation });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'envoi de la localisation.", error });
    }
};

// Historique des courses
export const consulterHistoriqueCourses = async (req, res) => {
    try {
        const historique = await prisma.course.findMany({
            where: { chauffeurId: req.user.id },
            include: { client: true },
        });
        res.json(historique);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de l'historique des courses.", error });
    }
};

// Récupération des notifications pour un chauffeur
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
