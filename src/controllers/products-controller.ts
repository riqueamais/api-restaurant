import { knex } from "@/database/knex";
import { AppError } from "@/utils/AppError";
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
        throw new AppError("Products not found", 404);
      }

      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  async indexById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), {
          message: "Invalid ID",
        })
        .parse(req.params.id);

      const product = await knex<ProductRepository>("products")
        .select()
        .where({ id }).first();

      if (!product) {
        throw new AppError("Product not found", 404);
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

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), {
          message: "Invalid ID",
        })
        .parse(req.params.id);

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

      const product = await knex<ProductRepository>("products")
        .update({ name, price, updated_at: knex.fn.now() })
        .where({ id }).first();

      if (!product) {
        throw new AppError("Product not found", 404);
      }

      res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), {
          message: "Invalid ID",
        })
        .parse(req.params.id);

      const product = await knex<ProductRepository>("products")
        .delete()
        .where({ id }).first();

      if (!product) {
        throw new AppError("Product not found", 404);
      }

      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export { ProductsController };
