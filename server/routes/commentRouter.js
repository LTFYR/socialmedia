const router = require("express").Router();
const commentController = require("../controllers/commentController");
const authorize = require("../middlewares/authorization");

router.route("/comment").post(authorize, commentController.addComment);

router.route("/comment/:id").patch(authorize, commentController.updComment);

router
  .route("/comment/:id/like")
  .patch(authorize, commentController.likeComment);
router
  .route("/comment/:id/dislike")
  .patch(authorize, commentController.dislikeComment);

router.route("/comment/:id").delete(authorize, commentController.deleteComment);

module.exports = router;
