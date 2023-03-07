import pool from "../config/db";
import { RowDataPacket } from "mysql2";
import { OkPacket } from "mysql2";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userQuery } from "../queries/userQuery";

const saltRounds = 10;

type UserRow = {
  id: number;
  email: string;
  password: string;
};

export const userService = {
  signupUser: async (email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const [rows] = await pool.query(userQuery.signupUser, [
      email,
      hashedPassword,
    ]);
    return rows;
  },

  authUser: async (email: string, password: string) => {
    const [rows] = await pool.query<UserRow[] & RowDataPacket[]>(
      userQuery.authUser,
      [email]
    );
    if (!rows || rows.length === 0) {
      throw new Error("User not found");
    }

    const match = await bcrypt.compare(password, rows[0].password);
    if (!match) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ userId: rows[0].id }, process.env.JWT_SECRETKEY!);

    return token;
  },

  //   checkPassword: async (userId: number, password: string) => {
  //     const [rows] = await pool.query<UserRow[] & RowDataPacket[]>(
  //       userQuery.getUserById,
  //       [userId]
  //     );

  //     if (!rows || !Array.isArray(rows) || rows.length === 0) {
  //       throw new Error("User not found");
  //     }

  //     const match = await bcrypt.compare(password, rows[0].password);

  //     if (!match) {
  //       throw new Error("Invalid password");
  //     }

  //     return match;
  //   },

  deleteUser: async (userId: number) => {
    const [result] = await pool.query(userQuery.deleteUser, [userId]);
    if ((result as OkPacket).affectedRows > 0) {
      return true;
    }
    return false;
  },
};
