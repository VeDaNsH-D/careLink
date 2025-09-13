import fs from 'fs';
import pool from './db.js';

const initDb = async () => {
  try {
    const sql = fs.readFileSync('./database.sql', 'utf8');
    await pool.query(sql);
    console.log('Database tables created successfully.');
  } catch (err) {
    console.error('Error creating database tables:', err);
  } finally {
    pool.end();
  }
};

initDb();
