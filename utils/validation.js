import { body, validationResult } from 'express-validator';

// Fonction de validation pour l'inscription et la connexion
export const validateRegistration = [
  body('username')
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  
  body('email')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .matches(/\d/).withMessage('Password must contain a number')
    .matches(/[a-zA-Z]/).withMessage('Password must contain a letter'),

  body('confirmPassword')
    .notEmpty().withMessage('Confirm Password is required')
    .custom((value, { req }) => value === req.body.password).withMessage('Passwords must match'),
];

// Fonction de validation pour la connexion
export const validateLogin = [
  body('email')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password is required'),
];

// Middleware de validation pour vérifier les erreurs
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Fonction de validation pour les véhicules
export const validateVehicle = [
  body('make')
    .notEmpty().withMessage('Make is required')
    .isLength({ min: 3 }).withMessage('Make must be at least 3 characters long'),

  body('model')
    .notEmpty().withMessage('Model is required')
    .isLength({ min: 3 }).withMessage('Model must be at least 3 characters long'),

  body('year')
    .notEmpty().withMessage('Year is required')
    .isInt({ min: 1900, max: new Date().getFullYear() }).withMessage('Invalid year'),

  body('driverId')
    .notEmpty().withMessage('Driver ID is required')
    .isInt().withMessage('Driver ID must be an integer'),
];

// Fonction de validation pour les courses (rides)
export const validateRide = [
  body('pickupLocation')
    .notEmpty().withMessage('Pickup location is required'),

  body('destination')
    .notEmpty().withMessage('Destination is required'),

  body('vehicleId')
    .notEmpty().withMessage('Vehicle ID is required')
    .isInt().withMessage('Vehicle ID must be an integer'),

  body('driverId')
    .notEmpty().withMessage('Driver ID is required')
    .isInt().withMessage('Driver ID must be an integer'),
];
