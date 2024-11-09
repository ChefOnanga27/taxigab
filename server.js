import express from 'express'
import router from './routes/adminRoute.js'
import { PrismaClient } from '@prisma/client';
 const app = express()
 const port = 4000

 // Configuration de la base de données
 const prisma = new PrismaClient();

 app.use(express.json())
 

 async function connect() {
   try {
     await prisma.$connect();
     console.log('Connexion à la base de données réussie !');
   } catch (error) {
     console.error('Erreur de connexion à la base de données:', error);
   }
 }
  
  connect();
 app.use('/',router)

  export default prisma
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

  export default prisma