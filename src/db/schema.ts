export const SCHEMA = {
  users: `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      job_title TEXT NOT NULL,
      phone TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `,
  
  salary_records: `
    CREATE TABLE IF NOT EXISTS salary_records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      gross_salary REAL NOT NULL,
      net_salary REAL NOT NULL,
      tax_amount REAL NOT NULL,
      insurance_amount REAL NOT NULL,
      calculation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `,
  
  expense_categories: `
    CREATE TABLE IF NOT EXISTS expense_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      icon TEXT NOT NULL
    )
  `,
  
  expenses: `
    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      category_id INTEGER NOT NULL,
      amount REAL NOT NULL,
      description TEXT,
      expense_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (category_id) REFERENCES expense_categories(id)
    )
  `,
  
  savings_goals: `
    CREATE TABLE IF NOT EXISTS savings_goals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      target_amount REAL NOT NULL,
      current_amount REAL DEFAULT 0,
      target_date DATE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `
};

export const INITIAL_DATA = {
  expense_categories: `
    INSERT OR IGNORE INTO expense_categories (name, icon) VALUES
    ('housing', '🏠'),
    ('utilities', '💡'),
    ('food', '🛒'),
    ('transportation', '🚗'),
    ('health', '⚕️'),
    ('entertainment', '🎮'),
    ('debts', '💳'),
    ('other', '📝')
  `
};