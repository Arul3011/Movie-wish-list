import express from 'express';
import cors from 'cors'; // Fixed typo: 'cros' → 'cors'
import clientPromise from '../lib/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();
const client = await clientPromise;
const db = client.db('movieListDb');

// JWT secret key (In production, store in env variable)
const JWT_SECRET = 'your_jwt_secret_key_here';

router.get('/', async (req, res) => {
  const result = await db.collection('users').find().toArray();
  return res.status(200).json({ data: result });
});

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      // Generate JWT
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      return res.status(200).json({ message: 'Login success', token });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
