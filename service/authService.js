import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const authService = {
  async register({ username, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await User.create({ username, email, password: hashedPassword });
  },

  async login({ email, password }) {
    const user = await User.findByEmail(email);
    if (!user || !await bcrypt.compare(password, user.password)) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
  },
};

export default authService;
