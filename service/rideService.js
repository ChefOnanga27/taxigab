import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createRide = async (rideData) => {
  try {
    const ride = await prisma.ride.create({
      data: rideData,
    });
    return ride;
  } catch (error) {
    throw new Error('Error creating ride');
  }
};

export const getRides = async () => {
  try {
    const rides = await prisma.ride.findMany();
    return rides;
  } catch (error) {
    throw new Error('Error retrieving rides');
  }
};

export default { createRide, getRides };
