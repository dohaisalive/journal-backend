const express = require("express");

const {
    fetchNotifications,
    createNotification,
    acceptFriend,
    deleteNotification,
} = require("./notifications.controllers");

const router = express.Router();

router.get("/", fetchNotifications);
router.post("/newNotification", createNotification);
router.put("/acceptFriendSentfrom/:userId/to/:friendId", acceptFriend);
router.delete("/deleteNotification/:notificationId", deleteNotification);


module.exports = router;
