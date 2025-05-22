import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { Request, Response } from 'express';
import productRoute from './routes/productRoute';




const app = express();
app.use(express.json());
app.use("/products", productRoute);
console.log('⚙️ Product Service routes mounted at /products');
app.get('/zzz-canary', (_req, res) => {
    console.log('🦊 canary route hit');
    res.send('canary');
  });
  
app.get('/health', (req: Request, res: Response) => {res.send("OK")});
const PORT = process.env.PORT || 5200;
app.listen(PORT, () => console.log(`product Service on ${PORT}`));
console.log('🐞 server.ts loaded and routes mounted.');