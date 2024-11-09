import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllVehicules = async () => {
  try {
    const vehicules = await prisma.vehicle.findMany();
    return vehicules;
  } catch (error) {
    throw new Error('Error retrieving vehicules');
  }
};

export const createVehicule = async (vehiculeData) => {
  try {
    const vehicule = await prisma.vehicule.create({
      data: vehiculeData,
    });
    return vehicule ;
  } catch (error) {
    throw new Error('Error creating vehicule');
  }
};

export default { getAllVehicules, createVehicule };
