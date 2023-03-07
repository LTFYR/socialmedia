const express = require("express");
const router = express.Router();
const postControl = require("../controllers/postController");
const authorize = require("../middlewares/authorization");

router
  .route("/post")
  .post(authorize, postControl.createPost)
  .get(authorize, postControl.getPosts);

router
  .route("/post/:id")
  .patch(authorize, postControl.updatePost)
  .get(authorize, postControl.singlePost);

router.patch("/post/:id/like", authorize, postControl.likePost);
router.patch("/post/:id/dislike", authorize, postControl.dislikePost);
router.patch("/save/:id", authorize, postControl.savePost);
router.patch("/unsave/:id", authorize, postControl.removeFromSaved);

router.get("/user-posts/:id", authorize, postControl.userPosts);
router.get("/savedposts", authorize, postControl.savedPosts);

module.exports = router;
