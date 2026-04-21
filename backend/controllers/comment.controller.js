import Comment from "../models/comment.model.js";

// ✅ ADD COMMENT
export const addComment = async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
};

// ✅ GET COMMENTS
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      videoId: req.params.videoId,
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
};

// ✅ DELETE COMMENT (ONLY OWNER)
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json("Comment not found");
    }

    // 🔥 OWNER CHECK
    if (comment.user !== req.query.user) {
      return res.status(403).json("Not allowed");
    }

    await Comment.findByIdAndDelete(req.params.id);

    res.json("Comment deleted");
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

// ✅ UPDATE COMMENT (ONLY OWNER)
export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json("Comment not found");
    }

    // 🔥 OWNER CHECK
    if (comment.user !== req.query.user) {
      return res.status(403).json("Not allowed");
    }

    const updated = await Comment.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};