import { Request, Response } from "express";
import { memosService } from "../../services/memosService";

interface CustomRequest extends Request {
  userId?: number;
}

export const memosController = {
  getMemos: async (req: CustomRequest, res: Response) => {
    try {
      const page = req.query.page ? +req.query.page : 1;
      const pageSize = req.query.pageSize ? +req.query.pageSize : 5;
      const userId = req.userId!;
      const memos = await memosService.getMemos(userId, page, pageSize);

      res.status(200).json(memos);
    } catch (error) {
      console.error(error);

      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  addMemos: async (req: CustomRequest, res: Response) => {
    try {
      const userId = req.userId!;
      const { title, content } = req.body;
      const newMemo = await memosService.addMemos(userId, title, content);
      res.status(201).json({ message: `added MemoId is ${newMemo}` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  editMemos: async (req: CustomRequest, res: Response) => {
    try {
      const { title, content } = req.body;
      const memoId = Number(req.params.id);
      const userId = req.userId!;
      await memosService.editMemos(memoId, userId, title, content);
      res.status(200).json({ memoId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  deleteMemos: async (req: CustomRequest, res: Response) => {
    const memoId = Number(req.params.id);
    const userId = req.userId!;

    const result = await memosService.deleteMemos(memoId, userId);

    if (!result) {
      return res.status(404).json({ message: "Memo not found" });
    }

    res.status(201).json({ message: `deleted MemoId is ${result}` });
  },
};
