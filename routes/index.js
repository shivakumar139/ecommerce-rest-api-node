import express from "express";
import { loginController, registerController , userController, refreshController} from "../controllers";
import auth from "../middlewares/auth";

const router = express.Router();


router.post("/register", registerController.register);
router.post("/login", loginController.login);
router.post("/refresh", refreshController.create);

router.post("/logout" ,loginController.logout);
router.get("/me", auth ,userController.me);


export default router;