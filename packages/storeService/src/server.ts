import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { Request, Response } from 'express';
import storeRoute from "./routes/storeRoute"

const app = express();

app.use(express.json());
app.use('/stores', storeRoute);
app.get('/health', (req: Request, res: Response) => {res.send("OK")});

const PORT = process.env.PORT ?? 5100;
app.listen(PORT, () => {
  console.log(`Store Service running on port ${PORT}`);
});