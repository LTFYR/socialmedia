const { default: mongoose } = require("mongoose");
const moongoose = require("mongoose");

const postSchema = moongoose.Schema(
  {
    text: String,
    postImages: {
      type: Array,
      required: true,
    },
    likes: [
      {
        type: moongoose.Types.ObjectId,
        ref: "user",
      },
    ],
    comments: [
      {
        type: moongoose.Types.ObjectId,
        ref: "comment",
      },
    ],
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

module.exports = moongoose.model("post", postSchema);
