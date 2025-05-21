import type { Pool } from "mysql2/promise";

export const initProductsTable = async (pool: Pool) => {
    const createTable = [
        'CREATE TABLE IF NOT EXISTS products (',
            'id INT AUTO_INCREMENT PRIMARY KEY,',
            'storeId INT NOT NULL,',
            'name VARCHAR(100) NOT NULL,',
            'description TEXT,',
            'price DECIMAL(10,2) NOT NULL,',
            'quantity INT NOT NULL,',
            'metadata TEXT,',
            'createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
        ') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;'
    ].join(' ');
    console.log(createTable);
    await pool.query(createTable);
    
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
    await initProductsTable(pool);
    // const fields = object.keys(updates).map(f => )
    const [result]: any = await pool.execute(
        `INSERT INTO products 
          (storeId, name, description, price, quantity, metadata) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [storeId, data.name, data.description, data.price, data.quantity, JSON.stringify(data.metadata || {})]
      );
      return result.insertId;
    };
    
    export const listProducts = async (pool: Pool, storeId: number, page = 1, limit = 10) => {
      await initProductsTable(pool);
      const offset = (page - 1) * limit;
      const [rows]: any = await pool.query(
        'SELECT * FROM products WHERE storeId = ? LIMIT ? OFFSET ?',
        [storeId, limit, offset]
      );
      return rows;
    };

    export const getProduct = async (pool: Pool, id: number) => {
        await initProductsTable(pool);
        const [rows]: any = await pool.query(
          'SELECT * FROM products WHERE id = ? LIMIT 1',
          [id]
        );
        return rows[0];
      };
      
    export const updateProduct = async (
        pool: Pool,
        id: number,
        updates: Partial<{ name: string; description: string; price: number; quantity: number; metadata: any }>
      ) => {
        await initProductsTable(pool);
        const fields = Object.keys(updates).map(f => `${f} = ?`).join(', ');
        const values = Object.values(updates);
        await pool.execute(
          `UPDATE products SET ${fields} WHERE id = ?`,
          [...values, id]
        );
    };

    export const deleteProduct = async (pool: Pool, id: number) => {
        await initProductsTable(pool);
        await pool.execute('DELETE FROM products WHERE id = ?', [id]);
    };