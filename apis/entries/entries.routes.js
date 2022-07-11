const express = require("express");
const upload = require("../../middleware/multer");
const passport = require("passport");

const {
  fetchEntries,
  createEntry,
  updateEntry,
  deleteEntry,
} = require("./entries.controller");

const router = express.Router();

router.get("/", fetchEntries);
router.post("/", createEntry);
router.put("/:EntryId", updateEntry);
router.delete(
  "/:EntryId",
  passport.authenticate("jwt", { session: false }),
  deleteEntry
);

module.exports = router;
