import express, {
  Application,
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from 'express';
import cors from 'cors';
import { productRoutes } from './modules/products/product-route';
import { orderRouter } from './modules/orders/orders-route';
const app: Application = express();

app.use(express.json());
app.use(cors());

// application routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRouter);

app.use(
  (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send('There was an error');
    }
    next();
  },
);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send('Route not found');
  next('Route not found');
});

app.get('/', (req: Request, res: Response) => {
  res.send('Home Page');
});

export default app;
