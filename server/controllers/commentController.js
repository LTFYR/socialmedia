const Comment = require("../models/comment");
const Post = require("../models/post");

const commentController = {
  addComment: async (req, res) => {
    try {
      const { postId, content, tag, reply, postUser } = req.body;

      const newcomment = new Comment({
        user: req.user._id,
        content,
        tag,
        reply,
        postUser,
        postId,
      });

      await Post.findOneAndUpdate(
        {
          _id: postId,
        },
        {
          $push: { comments: newcomment._id },
        },
        {
          new: true,
        }
      );

      await newcomment.save();

      res.status(200).json({ newcomment });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  updComment: async (req, res) => {
    try {
      const { content } = req.body;

      const upcomment = await Comment.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        { content }
      );

      if (!upcomment) res.status(400).json({ msg: "Something happened" });

      res.status(200).json({ msg: "Comment updated" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  likeComment: async (req, res) => {
    try {
      const currentLikedComment = await Comment.find({
        _id: req.params.id,
        likes: req.user._id,
      });
      if (currentLikedComment.length > 0)
        return res.status(400).json({ msg: "You already liked this post" });

      await Comment.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          $push: { likes: req.user._id },
        },
        { new: true }
      );

      res.status(200).json({ msg: "Liked comment" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  dislikeComment: async (req, res) => {
    try {
      await Comment.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          $pull: { likes: req.user._id },
        },
        { new: true }
      );

      res.status(200).json({ msg: "Disliked comment" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  deleteComment: async (req, res) => {
    try {
      const deletecomment = await Comment.findOneAndDelete({
        _id: req.params.id,
        $or: [
          {
            user: req.user._id,
          },
          {
            postUser: req.user._id,
          },
        ],
      });

      await Post.findOneAndUpdate(
        { _id: deletecomment.postId },
        {
          $pull: { comments: req.params.id },
        }
      );

      res.status(200).json({ msg: "Comment deleted successfully" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = commentController;
