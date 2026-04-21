import express from "express";
import {
  addComment,
  getComments,
  deleteComment,
  updateComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

// ✅ ADD COMMENT
router.post("/", addComment);

// ✅ GET COMMENTS BY VIDEO
router.get("/:videoId", getComments);

// ✅ DELETE COMMENT (ONLY OWNER)
router.delete("/:id", deleteComment);

// ✅ UPDATE COMMENT (ONLY OWNER)
router.put("/:id", updateComment);

export default router;