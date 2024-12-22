-- Drop existing tables if they exist
DROP TABLE IF EXISTS savings_goals CASCADE;
DROP TABLE IF EXISTS expenses CASCADE;
DROP TABLE IF EXISTS expense_categories CASCADE;
DROP TABLE IF EXISTS salary_records CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Drop existing triggers
DROP TRIGGER IF EXISTS users_updated_at ON users;

-- Drop existing functions
DROP FUNCTION IF EXISTS handle_updated_at();