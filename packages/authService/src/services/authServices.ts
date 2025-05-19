import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createTenant } from './tenant';
import type { Pool } from 'mysql2/promise';

type UserRow = { tenantId: string; userId: number; role: string};
export const registerTenant = async (
    name: string,
    email: string,
    password: string
): Promise<{tenantId: string }> => {
    const tenantId = email.split('@')[0];
    const pool = await createTenant(tenantId);

    await pool.execute(`
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100),
            email VARCHAR(100),
            password VARCHAR(255),
            role ENUM('owner', 'staff') DEFAULT 'owner'
            );
        `);
    
    const hashed = await bcrypt.hash(password, 10);
    await pool.execute(
        `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
        [name, email, hashed, 'owner']
    );
    return { tenantId };
};

export const authenticateTenant = async (
    email: string,
    password: string
): Promise<UserRow> => {
    const tenantId = email.split('@')[0];
    const pool = await createTenant(tenantId);

    const [rows]: any[] = await pool.execute(
        'SELECT id, password, role FROM users WHERE email = ? LIMIT 1',
        [email]
    );
    const user = rows[0];
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
    }
    return { tenantId, userId: user.id, role: user.role};
};