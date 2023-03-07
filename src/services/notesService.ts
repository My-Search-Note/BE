import pool from "../config/db";
import { OkPacket } from "mysql2";
import { notesQuery } from "../queries/NotesQuery";

interface Note {
  note_id: number;
  user_id: number;
  title: string;
  content: string;
  created_at: Date;
  updated_at?: Date;
}

export const notesService = {
  getNotes: async (userId: number, page: number, pageSize: number) => {
    const offset = (page - 1) * pageSize;
    const [rows] = await pool.query(notesQuery.getNotes, [
      userId,
      pageSize,
      offset,
    ]);
    return rows;
  },
  addNotes: async (userId: number, title: string, content: string) => {
    const [result] = await pool.query(notesQuery.addNotes, [
      userId,
      title,
      content,
    ]);
    return (result as OkPacket).insertId;
  },
  editNotes: async (
    noteId: number,
    userId: number,
    title: string,
    content: string
  ) => {
    const [result] = await pool.query(notesQuery.editNotes, [
      title,
      content,
      noteId,
      userId,
    ]);
    if ((result as OkPacket).affectedRows === 0) {
      throw new Error("No note found to update");
    }
    return noteId;
  },
  deleteNotes: async (noteId: number, userId: number) => {
    const [result] = await pool.query(notesQuery.deleteNotes, [noteId, userId]);
    if ((result as OkPacket).affectedRows > 0) {
      return noteId;
    }
  },
};
