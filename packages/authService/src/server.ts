import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { Request, Response } from 'express';
import authRoutes from "./routes/authRoutes";




const app = express();
app.use(express.json());
app.use("/auth", authRoutes);

app.get('/health', (req: Request, res: Response) => {res.send("OK")});
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Auth Service on ${PORT}`));