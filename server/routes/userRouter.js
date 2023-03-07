const express = require("express");
const router = express.Router();
const authorize = require("../middlewares/authorization");
const user = require("../controllers/userController");

router.get("/search", authorize, user.search);

router.get("/user/:id", authorize, user.singleUser);
router.patch("/user", authorize, user.updateUser);

router.patch("/user/:id/follow", authorize, user.followUser);
router.patch("/user/:id/unfollow", authorize, user.unFollowUser);

router.get("/suggestions", authorize, user.suggestions);

module.exports = router;
