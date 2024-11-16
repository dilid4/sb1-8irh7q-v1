import { SignJWT, jwtVerify } from 'jose';
import { createSecretKey } from 'crypto';

const secretKey = createSecretKey(process.env.JWT_SECRET || 'your-secret-key');

export const authService = {
  async createToken(payload) {
    const jwt = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(secretKey);
    return jwt;
  },

  async verifyToken(token) {
    try {
      const { payload } = await jwtVerify(token, secretKey);
      return payload;
    } catch {
      return null;
    }
  }
};