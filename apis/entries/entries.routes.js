const express = require("express");
const upload = require("../../middleware/multer");
const passport = require("passport");

const {
  fetchEntries,
  createEntry,
  updateEntry,
  deleteEntry,
  updateFav,
  fetchAUserEntries,
} = require("./entries.controller");

const router = express.Router();

router.get("/", fetchEntries);
router.get("/:UserId", fetchAUserEntries);
router.post("/", createEntry);
router.put("/:EntryId", updateEntry);
router.put("/fav/:EntryId", updateFav);
router.delete("/:EntryId", deleteEntry);

module.exports = router;
