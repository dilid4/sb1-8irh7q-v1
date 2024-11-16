import { User } from '../types/user';

// Development users with hardcoded credentials
const DEV_USERS: Record<string, User> = {
  'demo@demo.com': {
    id: 'demo',
    email: 'demo@demo.com',
    password: 'demo123',
    firstName: 'Demo',
    lastName: 'User',
    role: 'user',
    status: 'active',
    accountBalance: 10000,
    bonus: 100,
    equity: 10100,
    margin: 0,
    marginLevel: 0,
    openPositions: 0,
    pendingOrders: 0,
    accountType: 'standard'
  },
  'admin@admin.com': {
    id: 'admin',
    email: 'admin@admin.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    status: 'active',
    accountBalance: 0,
    bonus: 0,
    equity: 0,
    margin: 0,
    marginLevel: 0,
    openPositions: 0,
    pendingOrders: 0,
    accountType: 'admin'
  }
};

class UserService {
  async authenticate(email: string, password: string): Promise<{ token: string; user: Omit<User, 'password'> }> {
    try {
      console.log('Authenticating:', { email, password }); // Debug log
      
      // Convert email to lowercase for case-insensitive comparison
      const normalizedEmail = email.toLowerCase();
      const user = DEV_USERS[normalizedEmail];

      if (!user) {
        throw new Error('Invalid email or password');
      }

      if (user.password !== password) {
        throw new Error('Invalid email or password');
      }

      if (user.status !== 'active') {
        throw new Error('Account is not active');
      }

      // Create a simple token
      const token = btoa(JSON.stringify({
        userId: user.id,
        email: user.email,
        role: user.role,
        exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      }));

      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      return { token, user: userWithoutPassword };
    } catch (error) {
      console.error('Authentication error:', error);
      throw error;
    }
  }

  verifyToken(token: string): boolean {
    try {
      const decoded = JSON.parse(atob(token));
      return decoded.exp > Date.now();
    } catch {
      return false;
    }
  }

  async getUserById(id: string): Promise<Omit<User, 'password'> | null> {
    const user = Object.values(DEV_USERS).find(u => u.id === id);
    if (!user) return null;

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

export const userService = new UserService();