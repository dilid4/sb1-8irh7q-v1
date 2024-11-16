import { User } from '../types/user';

// Simple in-memory database with custom event system
type Listener = (event: { key: string; value: any }) => void;

class Database {
  private static instance: Database;
  private data: Map<string, any>;
  private listeners: Set<Listener>;

  private constructor() {
    this.data = new Map();
    this.listeners = new Set();
    
    // Initialize with demo user
    const users = new Map<string, User>();
    users.set('demo@demo.com', {
      id: 'demo',
      email: 'demo@demo.com',
      // Password: ABCabc-1-2-3
      password: '$2a$10$zXzqHQGQs3WESpE8P9FqUOHXUxeVBXtd9DB4UKbHqeJdKjrGkeFC2',
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
      pendingOrders: 0
    });

    this.data.set('users', users);
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(key: string, value: any): void {
    this.listeners.forEach(listener => listener({ key, value }));
  }

  async get(key: string): Promise<any> {
    return this.data.get(key);
  }

  async set(key: string, value: any): Promise<void> {
    this.data.set(key, value);
    this.notify(key, value);
  }

  async delete(key: string): Promise<boolean> {
    const result = this.data.delete(key);
    if (result) {
      this.notify(key, null);
    }
    return result;
  }

  async clear(): Promise<void> {
    this.data.clear();
    this.notify('clear', null);
  }
}

export const db = Database.getInstance();