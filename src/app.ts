import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { productRoutes } from './modules/products/product-route';
const app: Application = express();

app.use(express.json());
app.use(cors());

// application routes
app.use('/api/products', productRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Home Page');
});

export default app;
