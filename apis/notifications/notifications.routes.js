const express = require("express");

const {
    fetchNotifications,
    createNotification,
    acceptFriend,
    deleteNotification,
    pending,
    rejectFriend,
} = require("./notifications.controllers");

const router = express.Router();

router.get("/", fetchNotifications);
router.post("/newNotification", createNotification);
router.put("/acceptFriendSentfrom/:userId/to/:friendId", acceptFriend);
router.put("/pendingSentFrom/:userId/to/:friendId", pending);
router.put("/rejectFriend/:friendId", rejectFriend);
router.delete("/deleteNotification/:notificationId", deleteNotification);


module.exports = router;
