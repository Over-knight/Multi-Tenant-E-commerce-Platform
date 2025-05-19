import type { Pool } from "mysql2/promise";

export const createStore = async (
    pool: Pool,
    name: string,
    ownerId: number
): Promise<number> => {
    await pool.execute(`
        CREATE TABLE IF NOT EXISTS stores (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        ownerId INT
        );
    `);
    const [result]: any = await pool.execute(
        'INSERT INTO stores (name, ownerId) VALUES (?, ?)',
        [name, ownerId]
    );
    return result.insertId;
};

export const listStores = async (
    pool: Pool,
    ownerId: number
): Promise<any[]> => {
    const [rows]: any = await pool.query(
        'SELECT * FROM stores WHERE ownerId = ?',
        [ownerId]
    );
    return rows;
}