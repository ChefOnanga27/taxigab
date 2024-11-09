import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Inscription d'un client
export const inscriptionClient = async (req, res) => {
    const { nom, prenom, telephone, email, motDePasse } = req.body;

    try {
        const existingClient = await prisma.client.findUnique({ where: { email } });
        if (existingClient) {
            return res.status(400).json({ message: "Un client avec cet email existe déjà." });
        }

        const hashedPassword = await bcrypt.hash(motDePasse, 10);
        const client = await prisma.client.create({
            data: {
                nom,
                prenom,
                telephone,
                email,
                motDePasse: hashedPassword,
            },
        });
        res.status(201).json({ message: "Client inscrit avec succès.", client });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'inscription.", error });
    }
};

// Connexion d'un client
export const clientConnexion = async (req, res) => {
    const { email, motDePasse } = req.body;

    try {
        const client = await prisma.client.findUnique({ where: { email } });
        if (!client || !(await bcrypt.compare(motDePasse, client.motDePasse))) {
            return res.status(401).json({ message: "Identifiants invalides." });
        }
        const token = jwt.sign({ id: client.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la connexion.", error });
    }
};

// Demande d'une course
export const demanderUneCourse = async (req, res) => {
    const { pointDepart, destination } = req.body;
    const clientId = req.user.id;

    try {
        const course = await prisma.course.create({
            data: {
                clientId,
                pointDepart,
                destination,
                statut: "en attente",
            },
        });
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la demande de course.", error });
    }
};

// Détails d'une course spécifique
export const consulterDetailCourse = async (req, res) => {
    const { id } = req.params;
    const clientId = req.user.id;

    try {
        const course = await prisma.course.findUnique({
            where: { id: Number(id) },
            include: { chauffeur: true, client: true }
        });
        if (!course || course.clientId !== clientId) {
            return res.status(404).json({ message: "Course non trouvée." });
        }
        res.json(course);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des détails de la course.", error });
    }
};

// Récupération de l'historique des courses d'un client
export const consulterHistoriqueCoursesClient = async (req, res) => {
    const clientId = req.user.id;

    try {
        const historique = await prisma.course.findMany({
            where: { clientId },
            include: { chauffeur: true },
            orderBy: { id: 'desc' },
        });
        res.json(historique);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération de l'historique des courses.", error });
    }
};

// Annulation d'une course
export const annulerCourse = async (req, res) => {
    const { id } = req.params;

    try {
        const course = await prisma.course.findUnique({ where: { id: Number(id) } });
        if (!course) {
            return res.status(404).json({ message: "Course non trouvée." });
        }
        await prisma.course.delete({
            where: { id: Number(id) },
        });
        res.json({ message: "Course annulée." });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'annulation de la course.", error });
    }
};

// Récupération du profil d'un client
export const consulterProfilClient = async (req, res) => {
    const clientId = req.user.id;

    try {
        const client = await prisma.client.findUnique({ where: { id: clientId } });
        if (!client) {
            return res.status(404).json({ message: "Client non trouvé." });
        }
        res.json(client);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération du profil.", error });
    }
};

// Mise à jour du profil d'un client
export const mettreAjourProfil = async (req, res) => {
    const clientId = req.user.id;
    const { nom, prenom, telephone } = req.body;

    try {
        const updatedClient = await prisma.client.update({
            where: { id: clientId },
            data: { nom, prenom, telephone },
        });
        res.json({ message: "Profil mis à jour.", updatedClient });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la mise à jour du profil.", error });
    }
};

// Récupération des évaluations d'un chauffeur
export const consulterEvaluationsChauffeur = async (req, res) => {
    const { chauffeurId } = req.params;

    try {
        const evaluations = await prisma.evaluation.findMany({
            where: { chauffeurId: Number(chauffeurId) },
            orderBy: { createdAt: 'desc' },
        });
        res.json(evaluations);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des évaluations.", error });
    }
};

// Évaluer une course
export const evaluerCourse = async (req, res) => {
    const { id } = req.params;
    const { note, commentaire } = req.body;
    const clientId = req.user.id;

    try {
        const course = await prisma.course.findUnique({
            where: { id: Number(id) },
        });
        if (!course || course.clientId !== clientId) {
            return res.status(404).json({ message: "Course non trouvée ou non autorisée pour évaluation." });
        }

        const evaluation = await prisma.evaluation.create({
            data: {
                courseId: Number(id),
                note,
                commentaire,
            },
        });
        res.status(201).json(evaluation);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'évaluation de la course.", error });
    }
};

// Ajouter un paiement
export const ajouterPaiement = async (req, res) => {
    const { montant, modePaiement } = req.body;
    const clientId = req.user.id;

    try {
        const paiement = await prisma.paiement.create({
            data: {
                montant,
                modePaiement,
                clientId,
            },
        });
        res.status(201).json(paiement);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'ajout du paiement.", error });
    }
};

// Récupérer les notifications pour un client
export const consulterNotificationsClients = async (req, res) => {
    const clientId = req.user.id;

    try {
        const notifications = await prisma.notification.findMany({
            where: { clientId },
            orderBy: { createdAt: 'desc' },
        });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des notifications.", error });
    }
};

// Mot de passe oublié
export const motDePasseOublier = async (req, res) => {
    const { email } = req.body;

    try {
        const client = await prisma.client.findUnique({ where: { email } });
        if (!client) {
            return res.status(404).json({ message: "Client non trouvé." });
        }
        // Logique pour envoyer un email de réinitialisation (fonctionnalité à ajouter)
        res.json({ message: "Un email de réinitialisation de mot de passe a été envoyé." });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la demande de réinitialisation du mot de passe.", error });
    }
};

// Réinitialiser le mot de passe
export const reinitialiserMotDePasse = async (req, res) => {
    const { token, nouveauMotDePasse } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const hashedPassword = await bcrypt.hash(nouveauMotDePasse, 10);
        const client = await prisma.client.update({
            where: { id: decoded.id },
            data: { motDePasse: hashedPassword },
        });
        res.json({ message: "Mot de passe réinitialisé avec succès." });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la réinitialisation du mot de passe.", error });
    }
};
``
