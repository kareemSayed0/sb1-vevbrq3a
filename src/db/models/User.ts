import { getDb } from '../connection';

export interface User {
  id: number;
  name: string;
  jobTitle: string;
  phone: string;
  created_at: string;
}

export class UserModel {
  static create(name: string, jobTitle: string, phone: string): User {
    const db = getDb();
    const stmt = db.prepare(`
      INSERT INTO users (name, job_title, phone)
      VALUES (?, ?, ?)
    `);
    
    const result = stmt.run(name, jobTitle, phone);
    
    return {
      id: result.lastInsertRowid as number,
      name,
      jobTitle,
      phone,
      created_at: new Date().toISOString()
    };
  }
  
  static findByPhone(phone: string): User | null {
    const db = getDb();
    const stmt = db.prepare('SELECT * FROM users WHERE phone = ?');
    return stmt.get(phone) as User | null;
  }
  
  static findById(id: number): User | null {
    const db = getDb();
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    return stmt.get(id) as User | null;
  }
}