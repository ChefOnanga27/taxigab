import express from 'express';
import router from './routes/adminRoute.js'
//import authRoutes from './routes/authRoutes.js';
//import userRoutes from './routes/userRoutes.js';
//import vehicleRoutes from './routes/vehicleRoutes.js';
//import rideRoutes from './routes/rideRoutes.js';
//import paymentRoutes from './routes/paymentRoutes.js';
//import errorHandler from './middleware/error.js';


// Routes
//app.use('/api/auth', authRoutes);
//app.use('/api/users', userRoutes);
a//pp.use('/api/vehicles', vehicleRoutes);
//app.use('/api/rides', rideRoutes);
app.use('/api/router', router);

// Error Handling Middleware
app.use(errorHandler);

export default app;
