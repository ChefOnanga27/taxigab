import prisma from '../prisma/client.js'; 
const prisma = new PrismaClient();

// Créer un nouveau chauffeur
export const createChauffeur = async (chauffeurData) => {
  try {
    const newChauffeur = await prisma.chauffeur.create({
      data: chauffeurData,
    });
    return newChauffeur;
  } catch (error) {
    throw new Error('Error creating chauffeur: ' + error.message);
  }
};

// Récupérer un chauffeur par son ID
export const getChauffeurById = async (chauffeurId) => {
  try {
    const chauffeur = await prisma.chauffeur.findUnique({
      where: { id: chauffeurId },
    });
    if (!chauffeur) {
      throw new Error('Chauffeur not found');
    }
    return chauffeur;
  } catch (error) {
    throw new Error('Error fetching chauffeur: ' + error.message);
  }
};

// Récupérer tous les chauffeurs
export const getAllChauffeurs = async () => {
  try {
    const chauffeurs = await prisma.chauffeur.findMany();
    return chauffeurs;
  } catch (error) {
    throw new Error('Error fetching chauffeurs: ' + error.message);
  }
};

// Mettre à jour un chauffeur
export const updateChauffeur = async (chauffeurId, chauffeurData) => {
  try {
    const updatedChauffeur = await prisma.chauffeur.update({
      where: { id: chauffeurId },
      data: chauffeurData,
    });
    return updatedChauffeur;
  } catch (error) {
    throw new Error('Error updating chauffeur: ' + error.message);
  }
};

// Supprimer un chauffeur
export const deleteChauffeur = async (chauffeurId) => {
  try {
    const deletedChauffeur = await prisma.chauffeur.delete({
      where: { id: chauffeurId },
    });
    return deletedChauffeur;
  } catch (error) {
    throw new Error('Error deleting chauffeur: ' + error.message);
  }
};

export default {
  createChauffeur,
  getChauffeurById,
  getAllChauffeurs,
  updateChauffeur,
  deleteChauffeur,
};
