import type { Pool } from "mysql2/promise";


export const inviteStaff = async (
    pool: Pool,
    storeId: number,
    userId: number,
    role: 'manager' | 'cashier'
): Promise<number> => {
    await pool.execute(`
        CREATE TABLE IF NOT EXISTS staff (
        id INT AUTO_INCREMENT PRIMARY KEY,
        storeId INT,
        userId INT,
        role ENUM('manager', 'cashier') NOT NULL
        ); 
    `);

    const [result]: any = await pool.execute(
        'INSERT INTO staff (storeId, userId, role) VALUES (?, ?, ?)',
        [storeId, userId, role]
    );
    return result.insertId;
};