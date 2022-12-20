import express from "express";
import { loginController, registerController , userController, refreshController, productController} from "../controllers";
import admin from "../middlewares/admin";
import auth from "../middlewares/auth";

const router = express.Router();


router.post("/register", registerController.register);
router.post("/login", loginController.login);
router.post("/refresh", refreshController.create);

router.post("/logout" , auth, loginController.logout);
router.get("/me", auth ,userController.me);


router.post("/products", [auth, admin], productController.store)

router.put("/products/:id", [auth, admin], productController.update)

router.delete("/products/:id", [auth, admin], productController.delete)
router.get("/products/:id", auth, productController.getOneProduct)

router.get("/products", auth, productController.getAllProducts)

export default router;