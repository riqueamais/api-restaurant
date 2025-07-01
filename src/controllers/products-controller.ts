import { knex } from "@/database/knex";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

class ProductsController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.query;

      const products = await knex<ProductRepository>("products")
        .select()
        .whereLike("name", `%${name ?? ""}%`);

      if (!products || products.length === 0) {
        return res.status(404).json({ message: "Products not found" });
      }

      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  async indexById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const product = await knex<ProductRepository>("products")
        .select()
        .where({ id });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json(product);
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

      await knex<ProductRepository>("products").insert({ name, price });

      res.status(201).json({ message: "Product created successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export { ProductsController };
