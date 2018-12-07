// Helper functions

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Encrypt password
const encryptedPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(8));

// Compare passwords
const compare = (plainPassword, hashedPassword) => bcrypt.compare(plainPassword, hashedPassword);

// Generate token
const generateToken = id => jwt.sign({ userId: id }, process.env.SECRET, { expiresIn: '7d' });

export { encryptedPassword, generateToken, compare };
