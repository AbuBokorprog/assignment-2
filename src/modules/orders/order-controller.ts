import { Request, Response } from 'express';
import { OrderService } from './order-service';
import { byEmail, OrderZodSchema } from './orders-validation';

const createOrder = async (req: Request, res: Response) => {
  const orderData = req.body;
  const order = OrderZodSchema.parse(orderData);

  const data = await OrderService.createOrder(order);

  try {
    // if error like invalid id or insufficient stock
    if (typeof data == 'string') {
      res.status(200).json({
        success: false,
        message: data,
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data,
      });
    }
  } catch (error: unknown) {
    res.status(200).json({
      success: false,
      message: error as string,
    });
  }
};

const retrieveAllOrder = async (req: Request, res: Response) => {
  const query = byEmail.parse(req?.query);

  try {
    let emailQuery = {};
    // if query email have get user orders
    if (query?.email) {
      emailQuery = {
        email: { $regex: query.email, $options: 'i' },
      };
      const data = await OrderService.retrieveAllOrder(emailQuery);

      // if there is no data like empty array
      if (data.length == 0) {
        res.status(500).json({
          success: false,
          message: 'There is no orders for user email!',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully for user email!',
        data,
      });
    } else {
      // work for retrieve all orders
      const data = await OrderService.retrieveAllOrder();
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data,
      });
    }
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
