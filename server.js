import express from 'express'
import { Prisma, PrismaClient } from '@prisma/client';

 const app = express()
 const port = 3000

 app.get('/', (req, res) => {
    res.send('Hello World!')
  })

 
  // Configuration de la base de données
  const prisma = new PrismaClient();

  async function connect() {
    try {
      await prisma.$connect();
      console.log('Connexion à la base de données réussie !');
    } catch (error) {
      console.error('Erreur de connexion à la base de données:', error);
    }
  }
  
  connect();

  
  
  app.listen(port, () => {
    console.log(`le serveur demarre bien ${port}`)
  })

  export default prisma