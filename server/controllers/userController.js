const User = require("../models/user");

const userCntr = {
  search: async (req, res) => {
    try {
      const users = await User.find({
        username: { $regex: req.query.username },
      })
        .limit(10)
        .select("fullname username avatar");
      res.json({ users });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  singleUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
        .select("-password")
        .populate("followers following", "-password");
      if (!user) return res.status(400).json({ msg: "User couldn't found" });
      res.json({ user });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { avatar, mobile, adress, fullname, about, gender, website } =
        req.body;
      if (!fullname) return res.status(400).json({ msg: "Add fullname" });

      await User.findByIdAndUpdate(
        { _id: req.user._id },
        {
          avatar,
          mobile,
          adress,
          fullname,
          about,
          gender,
          website,
        }
      );
      res.json({ msg: "Updated" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  followUser: async (req, res) => {
    try {
      const user = await User.find({
        _id: req.params.id,
        followers: req.user._id,
      });

      if (user.length > 0)
        return res.status(500).json({ msg: "Already followed" });

      const newUser = await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: { followers: req.user._id },
        },
        { new: true }
      ).populate("followers following", "-password");

      await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            following: req.params.id,
          },
        },
        { new: true }
      );

      res.status(200).json(newUser);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  unFollowUser: async (req, res) => {
    try {
      await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          $pull: {
            followers: req.user._id,
          },
        },
        { new: true }
      );

      await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $pull: {
            following: req.params.id,
          },
        },
        { new: true }
      );

      res.status(500).json({ msg: "Unfollowed" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  suggestions: async (req, res) => {
    try {
      const usersarr = [...req.user.following, req.user._id];

      const number = req.query.num || 10;

      const suggestedUsers = await User.aggregate([
        {
          $match: { _id: { $nin: usersarr } },
        },
        {
          $sample: { size: number },
        },
        {
          $lookup: {
            from: "users",
            localField: "followers",
            foreignField: "_id",
            as: "followers",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "following",
            foreignField: "_id",
            as: "following",
          },
        },
      ]).project("-password");

      return res
        .status(200)
        .json({ suggestedUsers, result: suggestedUsers.length });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = userCntr;
