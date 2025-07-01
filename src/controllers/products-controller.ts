import { knex } from "@/database/knex";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

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
      const bodySchema = z.object({
        name: z
          .string({ required_error: "name is required!" })
          .trim()
          .min(6, "name must be at least 6 characters long")
          .max(100, "name must be at most 100 characters long"),
        price: z
          .number({ required_error: "price is required!" })
          .gt(0, "price must be greater than 0"),
      });

      const { name, price } = bodySchema.parse(req.body);

      await knex("products").insert({ name, price });

      res.status(201).json({ message: "Product created successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export { ProductsController };
