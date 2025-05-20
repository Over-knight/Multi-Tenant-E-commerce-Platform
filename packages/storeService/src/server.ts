import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { Request, Response } from 'express';
import storeRoute from "./routes/storeRoute"
import staffRoute from "../../staffService/src/routes/staffRoute";

const app = express();

app.use(express.json());
app.use('/stores', storeRoute);
app.use('/stores', staffRoute);
app.get('/health', (req: Request, res: Response) => {res.send("OK")});

const PORT = process.env.PORT ?? 5100;
app.listen(PORT, () => {
  console.log(`Store Service running on port ${PORT}`);
});