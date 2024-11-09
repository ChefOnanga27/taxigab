import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllClients = async () => {
  try {
    const clients = await prisma.client.findMany();
    return clients;
  } catch (error) {
    throw new Error('Error retrieving users');
  }
};

export const createClient = async (userData) => {
  try {
    const client = await prisma.client.create({
      data: clientData,
    });
    return client;
  } catch (error) {
    throw new Error('Error creating client');
  }
};

export default { getAllClients, createClient };
