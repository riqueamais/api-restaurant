import { NextFunction, Request, Response } from "express";

class ProductsController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json({ message: "List of products" });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(201).json({ message: "Product created successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export { ProductsController };
