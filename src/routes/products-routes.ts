import { Router } from "express";
import { ProductsController } from "../controllers/products-controller";

const productsRoutes = Router();
const productsController = new ProductsController();

productsRoutes.get("/", productsController.index);
productsRoutes.get("/:id", productsController.indexById);
productsRoutes.post("/", productsController.create);
productsRoutes.put("/:id", productsController.update);
productsRoutes.delete("/:id", productsController.delete);

export { productsRoutes };
