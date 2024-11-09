import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Envoi de la localisation
export const envoyerLocalisation = async (req, res) => {
    const { latitude, longitude, courseDepart, courseArrivee } = req.body;
    const courseId = req.params.id; // ID de la course

    // Vérification de la présence des données nécessaires
    if (!latitude || !longitude || !courseDepart || ! courseArrivee) {
        return res.status(400).json({ message: "La latitude, la longitude, le lieu de départ et le lieu d'arrivée sont requis." });
    }

    try {
        // Créer une nouvelle entrée de localisation pour la course
        const localisation = await prisma.localisation.create({
            data: {
                courseId: Number(courseId),
                latitude,
                longitude,
                courseDepart,
                 courseArrivee,
            },
        });
        res.json({ message: "Localisation reçue.", localisation });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de l'envoi de la localisation.", error: error.message });
    }
};

// Récupération de la localisation en temps réel d'une course
export const recupererLocalisation = async (req, res) => {
    const courseId = req.params.id; // ID de la course

    try {
        // Récupérer toutes les localisations pour une course donnée
        const localisations = await prisma.localisation.findMany({
            where: { courseId: Number(courseId) },
            orderBy: { timestamp: 'desc' }, // Ordre décroissant par timestamp pour obtenir la localisation la plus récente
        });

        // Si aucune localisation n'est trouvée
        if (localisations.length === 0) {
            return res.status(404).json({ message: "Aucune localisation trouvée pour cette course." });
        }

        // Retourner les localisations avec les lieux de départ et d'arrivée
        res.json(localisations);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des localisations.", error: error.message });
    }
};
