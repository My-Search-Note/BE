import { Request, Response } from "express";
import { userService } from "../../services/userService";

interface CustomRequest extends Request {
  userId?: number;
}

export const userController = {
  signup: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const rows = await userService.signupUser(email, password);
      res.status(201).send("User registered successfully!");
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  signin: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const token = await userService.authUser(email, password);
      res.cookie("token", token, { httpOnly: true });
      res.send({ token });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error signing in user");
    }
  },
  //   checkPassword: async (req: Request, res: Response) => {
  //     try {
  //       const { userId, password } = req.body;
  //       const isMatch = await userService.checkPassword(userId, password);

  //       if (isMatch) {
  //         res.status(200).send("Password matches");
  //       } else {
  //         res.status(400).send("Password does not match");
  //       }
  //     } catch (err) {
  //       console.error(err);
  //       res.status(500).send("Error checking password");
  //     }
  //   },
  deleteUser: async (req: CustomRequest, res: Response) => {
    try {
      const userId = req.userId!;
      const result = await userService.deleteUser(userId);
      if (result) {
        res.status(200).json({ message: "User successfully deleted" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
