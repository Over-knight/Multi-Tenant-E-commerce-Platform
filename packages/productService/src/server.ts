import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { Request, Response } from 'express';
import productRoutes from "./routes/productRoute";




const app = express();
app.use(express.json());
app.use("/products", productRoutes);

app.get('/health', (req: Request, res: Response) => {res.send("OK")});
const PORT = process.env.PORT || 5200;
app.listen(PORT, () => console.log(`product Service on ${PORT}`));