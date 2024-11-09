import express from 'express';
import { envoiyerLocalisation, recupererLocalisation } from './controllers/locationController.js';
import { verifyTokenChauffeur } from './middlewares/authMiddleware.js';
import router from './routes/adminRoute.js'
//import authRoutes from './routes/authRoutes.js';
//import userRoutes from './routes/userRoutes.js';
//import vehicleRoutes from './routes/vehicleRoutes.js';

//import paymentRoutes from './routes/paymentRoutes.js';
//import errorHandler from './middleware/error.js';
import chauffeurRoutes from './routes/chauffeurRoute.js'; // Assurez-vous que le chemin est correct
app.use('/chauffeur', chauffeurRoutes);



// Routes
//app.use('/api/auth', authRoutes);
//app.use('/api/users', userRoutes);
a//pp.use('/api/vehicles', vehicleRoutes);
app.use('/api/clientrouter', clientrouter);
app.use('/api/router', router);



// Error Handling Middleware
app.use(errorHandler);

export default app;
