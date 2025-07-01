import { knex } from "@/database/knex";
import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";

class TablesController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const tables = await knex<TableRepository>("tables").select();

      if (!tables || tables.length === 0) {
        throw new AppError("No tables found", 404);
      }

      res.status(200).json(tables);
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

      const table = await knex<TableRepository>("tables")
        .select()
        .where({ id })
        .first();

      if (!table) {
        throw new AppError("Table not found", 404);
      }

      res.status(200).json(table);
    } catch (error) {
      next(error);
    }
  }
}

export { TablesController };
