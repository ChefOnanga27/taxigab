import express from 'express'
import clientrouter from './routes/clientsRoutes.js';
import router from './routes/adminRoute.js'
import chauffeurrouter from './routes/chauffeurRoute.js'
import { PrismaClient } from '@prisma/client';
import localisationrouter from './routes/localisationRoute.js'
import cors from 'cors'

 const app = express()
 const port = 4000

 // Configuration de la base de données
 const prisma = new PrismaClient();

 app.use(express.json())
 app.use(cors())
 

 async function connect() {
   try {
     await prisma.$connect();
     console.log('Connexion à la base de données réussie !');
   } catch (error) {
     console.error('Erreur de connexion à la base de données:', error);
   }
 }
 // Si vous souhaitez configurer CORS pour des origines spécifiques, vous pouvez le faire ainsi :
/*
app.use(cors({
  origin: 'https://exemple.com',  // Autorise uniquement https://exemple.com
  methods: ['GET', 'POST'],      // Autorise uniquement GET et POST
  allowedHeaders: ['Content-Type', 'Authorization'] // Spécifie les en-têtes autorisés
}));
*/

// Exemple de route
app.get('/', (req, res) => {
    res.send('CORS configuré avec succès');
  });

 connect();
 app.use('/',router)
 app.use('/',clientrouter)
 app.use('/',chauffeurrouter)
 app.use('/',localisationrouter)


  
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

  export default prisma