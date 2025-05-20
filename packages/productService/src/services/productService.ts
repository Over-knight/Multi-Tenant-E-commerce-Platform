import type { Pool } from "mysql2/typings/mysql/lib/Pool";

export const initProductsTable = async (pool: Pool) => {
    await pool.execute(`
        CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        storeId INT,
        name VARCHAR(100),
        description TEXT'
        price DECIMAL(10,2),
        quantity INT,
        metadata JSON,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);
};

export const createProduct = async (
    pool: Pool,
    storeId: number,
    data: {name: string; 
        description: string;
        price: number;
        quantity: number;
        metadata?: any;
    }
) => {
    await initProductsTable
}