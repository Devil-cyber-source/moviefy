import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const defaultData = { users: [], movies: [], categories: [] };
const db = new Low(adapter, defaultData);

// Initialize database
await db.read();
db.data = db.data || defaultData;

// Add default admin if not exists
if (!db.data.users || !db.data.users.find(u => u.email === 'admin@moviefy.com')) {
  db.data.users = db.data.users || [];
  db.data.users.push({
    id: '1',
    name: 'Admin',
    email: 'admin@moviefy.com',
    password: await bcrypt.hash('admin123', 10),
    role: 'admin',
    referralCode: 'ADMIN001',
    myList: [],
    subscription: {
      plan: 'premium',
      status: 'active',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
    },
    createdAt: new Date().toISOString()
  });
  await db.write();
}

export default db;
