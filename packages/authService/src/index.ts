import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { Request, Response } from 'express';
const app = express();
app.use(express.json());
app.get('/health', (req: Request, res: Response) => {res.send("OK")});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Auth Service on ${PORT}`));