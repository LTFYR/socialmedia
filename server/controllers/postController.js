const Post = require("../models/post");
const User = require("../models/user");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const postControl = {
  createPost: async (req, res) => {
    try {
      const { text, postImages } = req.body;

      if (postImages.length === 0)
        return res.status(400).json({ msg: "You must add atleaset 1 photo" });

      const post = new Post({
        text,
        postImages,
        user: req.user._id,
      });
      await post.save();

      res.status(200).json({ msg: "Created new post", post });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getPosts: async (req, res) => {
    try {
      const posts = await Post.find({
        user: [...req.user.following, req.user._id],
      })
        .sort("-createdAt")
        .populate("user likes", "avatar username fullname")
        .populate({
          path: "comments",
          populate: {
            path: "user likes",
            select: "-password",
          },
        });

      res.status(200).json({
        msg: "Posts",
        res: posts.length,
        posts,
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  updatePost: async (req, res) => {
    try {
      const { text, postImages } = req.body;
      const post = await Post.findOneAndUpdate(
        { _id: req.params.id },
        { text, postImages }
      ).populate("user likes", "avatar username fullname");

      res.status(200).json({
        msg: "Updated",
        updatedPost: {
          ...post._doc,
          text,
          postImages,
        },
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  likePost: async (req, res) => {
    try {
      const currentLikedPost = await Post.find({
        _id: req.params.id,
        likes: req.user._id,
      });
      if (currentLikedPost.length > 0)
        return res.status(400).json({ msg: "You already liked this post" });

      await Post.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          $push: { likes: req.user._id },
        },
        { new: true }
      );

      res.status(200).json({ msg: "Liked" });
    } catch (error) {}
  },
  dislikePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          $pull: { likes: req.user._id },
        },
        { new: true }
      );

      res.status(200).json({ msg: "Disliked" });
    } catch (error) {}
  },
  userPosts: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.params.id }).sort("-createdAt");

      res.status(200).json({ posts, result: posts.length });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  singlePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)
        .populate("user likes", "avatar username fullname")
        .populate({
          path: "comments",
          populate: {
            path: "user likes",
            select: "-password",
          },
        });

      res.status(200).json({ post });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  savePost: async (req, res) => {
    try {
      const user = await Post.find({
        _id: req.user._id,
        saved: req.params.id,
      });
      if (user.length > 0)
        return res.status(400).json({ msg: "You already saved this post" });

      await User.findOneAndUpdate(
        {
          _id: req.user._id,
        },
        {
          $push: { saved: req.params.id },
        },
        { new: true }
      );

      res.status(200).json({ msg: "Post saved" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  removeFromSaved: async (req, res) => {
    try {
      await User.findOneAndUpdate(
        {
          _id: req.user._id,
        },
        {
          $pull: { saved: req.params.id },
        },
        { new: true }
      );

      res.status(200).json({ msg: "Removed from saved" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  savedPosts: async (req, res) => {
    try {
      const posts = new APIfeatures(
        Post.find({
          _id: { $in: req.user.saved },
        }),
        req.query
      ).paginating();

      const savedPosts = await posts.query.sort("-createdAt");

      res.status(200).json({
        savedPosts,
        result: savedPosts.length,
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = postControl;
