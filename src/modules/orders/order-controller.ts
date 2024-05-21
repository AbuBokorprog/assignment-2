import { Request, Response } from 'express';
import { OrderService } from './order-service';
import { OrderZodSchema } from './orders-validation';

const createOrder = async (req: Request, res: Response) => {
  const orderData = req.body;

  const order = OrderZodSchema.parse(orderData);

  const data = await OrderService.createOrder(order);

  try {
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data,
    });
  } catch (error: unknown) {
    res.status(200).json({
      success: false,
      message: error as string,
    });
  }
};
const retrieveAllOrder = async (req: Request, res: Response) => {
  const data = await OrderService.retrieveAllOrder();

  try {
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error as string,
    });
  }
};

export const OrderController = {
  createOrder,
  retrieveAllOrder,
};
