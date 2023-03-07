const { default: mongoose } = require("mongoose");
const moongoose = require("mongoose");

const commentSchema = moongoose.Schema(
  {
    content: String,
    tag: Object,
    reply: mongoose.Types.ObjectId,
    likes: [
      {
        type: moongoose.Types.ObjectId,
        ref: "user",
      },
    ],
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    postId: mongoose.Types.ObjectId,
    postUser: mongoose.Types.ObjectId,
  },
  { timestamps: true }
);

module.exports = moongoose.model("comment", commentSchema);
