import Database from 'better-sqlite3';
import { SCHEMA, INITIAL_DATA } from './schema';

let db: Database.Database | null = null;

export function initDb(): void {
  if (db) return;

  try {
    db = new Database(':memory:', { verbose: console.log });
    
    // Create tables
    Object.values(SCHEMA).forEach(createTableSQL => {
      db!.exec(createTableSQL);
    });

    // Insert initial data
    Object.values(INITIAL_DATA).forEach(insertSQL => {
      db!.exec(insertSQL);
    });

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}

export function getDb(): Database.Database {
  if (!db) {
    initDb();
  }
  return db!;
}

export function closeDb(): void {
  if (db) {
    db.close();
    db = null;
  }
}