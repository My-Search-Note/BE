import pool from "../config/db";
import { OkPacket, RowDataPacket } from "mysql2";
import { memosQuery } from "../queries/memosQuery";

interface Memo {
  memo_id: number;
  user_id: number;
  title: string;
  content: string;
  created_at: Date;
  updated_at?: Date;
}

interface CountRowData extends RowDataPacket {
  count?: number;
}

export const memosService = {
  getMemos: async (userId: number, page: number, pageSize: number) => {
    const offset = (page - 1) * pageSize;
    const [rows] = await pool.query(memosQuery.getMemos, [
      userId,
      pageSize,
      offset,
    ]);

    const [totalCountRow] = await pool.query<CountRowData[]>(
      memosQuery.countTotalMemos,
      [userId]
    );

    return { memos: rows, total_count: totalCountRow[0].count };
  },
  addMemos: async (userId: number, title: string, content: string) => {
    const [result] = await pool.query(memosQuery.addMemos, [
      userId,
      title,
      content,
    ]);
    return (result as OkPacket).insertId;
  },
  editMemos: async (
    memoId: number,
    userId: number,
    title: string,
    content: string
  ) => {
    const [result] = await pool.query(memosQuery.editMemos, [
      title,
      content,
      memoId,
      userId,
    ]);
    if ((result as OkPacket).affectedRows === 0) {
      throw new Error("No memo found to update");
    }
    return memoId;
  },
  deleteMemos: async (memoId: number, userId: number) => {
    const [result] = await pool.query(memosQuery.deleteMemos, [memoId, userId]);
    if ((result as OkPacket).affectedRows > 0) {
      return memoId;
    }
  },
};
