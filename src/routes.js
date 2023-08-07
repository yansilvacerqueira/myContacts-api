import { Router } from "express";
import ContactController from "./app/controllers/ContactController.js";
import CategoryController from "./app/controllers/CategoryController.js";

const router = Router();
router.get(
  "/v1/contacts",
  // (request, response, next) => {
  //   // Middleware 1

  //   next();
  // },
  ContactController.index
);
router.get("/v1/contacts/:id", ContactController.show);
router.post("/v1/contacts", ContactController.store);
router.put("/v1/contacts/:id", ContactController.update);
router.delete("/v1/contacts/:id", ContactController.delete);

router.get("/v1/categories", CategoryController.index);
router.get("/v1/categories/:id", CategoryController.show);
router.post("/v1/categories", CategoryController.store);
router.put("/v1/categories/:id", CategoryController.update);
router.delete("/v1/categories/:id", CategoryController.delete);

export default router;
