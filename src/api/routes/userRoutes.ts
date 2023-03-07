import { Router } from "express";
import { userController } from "../controllers/userController";

const userRoutes = Router();

// User API routes
userRoutes.post("/signup", userController.signup);
userRoutes.post("/signin", userController.signin);
// userRoutes.put("/users/:id", userController.updateUserById);
userRoutes.delete("/users/:id", userController.deleteUser);

export default userRoutes;
