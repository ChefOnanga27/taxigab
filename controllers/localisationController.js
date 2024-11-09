import PrismaClient from '@prisma/client'
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Envoi de la localisation
export const envoiyerLocalisation = async (req, res) => {
    const { latitude, longitude } = req.body;
    const courseId = req.params.id; // ID de la course

    try {
        // Créer une nouvelle entrée de localisation pour la course
        const localisation = await prisma.localisation.create({
            data: {
                courseId: Number(courseId),
                latitude,
                longitude,
            },
        });
        res.json({ message: "Localisation reçue.", localisation });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'envoi de la localisation.", error });
    }
};

// Récupération de la localisation en temps réel d'une course
export const recupererLocalisation = async (req, res) => {
    const courseId = req.params.id; // ID de la course

    try {
        // Récupérer toutes les localisations pour une course donnée
        const localisations = await prisma.localisation.findMany({
            where: { courseId: Number(courseId) },
            orderBy: { timestamp: 'desc' }, // Ordre décroissant par timestamp
        });
        res.json(localisations);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des localisations.", error });
    }
};


// Fonction pour calculer la distance entre deux points géographiques (en kilomètres)
export const calculerDistance = (lat1, long1, lat2, long2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Rayon de la Terre en km
    const dLat = toRad(lat2 - lat1);
    const dLong = toRad(long2 - long1);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance en kilomètres
};

















// // controllers/locationController.js
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// // Envoi de la localisation d'un chauffeur
// exports.localisation = async (req, res) => {
//     const { latitude, longitude } = req.body;
//     const chauffeurId = req.user.id;

//     try {
//         // Logique pour mettre à jour la localisation dans une table ou simplement enregistrer
//         // Pour cet exemple, nous allons juste renvoyer les données reçues
//         res.json({ message: "Localisation reçue.", latitude, longitude });
//     } catch (error) {
//         res.status(500).json({ message: "Erreur lors de l'envoi de la localisation.", error });
//     }
// };
