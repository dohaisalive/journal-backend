const Entry = require("../../DB/models/Entry");
const User = require("../../DB/models/User");
const Notification = require("../../DB/models/Notification");

exports.fetchEntries = async (req, res) => {
  const allEntries = await Entry.find().populate("friends");
  res.status(200).json(allEntries);
};

exports.fetchAUserEntries = async (req, res) => {
  const userId = req.params.UserId;
  const allEntries = await Entry.find().populate("friends");

  const userEntries = allEntries.filter((entry) => entry.user == userId);
  res.status(200).json(userEntries);
};

exports.createEntry = async (req, res) => {
  try {
    const newEntry = await Entry.create(req.body);

    if (newEntry.friends.length != 0) {
      newEntry.friends.forEach(async (friendID) => {
        const notification = await Notification.create({
          sender: newEntry.user,
          receiver: friendID,
          type: "tag",
          entry: newEntry._id,
        });

        await User.findByIdAndUpdate(
          friendID,
          { $push: { notifications: notification } },
          { new: true }
        ).select("-password");
      });
    }

    res.status(201).json(newEntry);
  } catch (error) {
    res.status(501).json(error);
  }
};

exports.updateEntry = async (req, res) => {
  try {
    const foundEntry = await Entry.findById(req.params.EntryId);
    if (foundEntry) {
      await Entry.findByIdAndUpdate(req.params.EntryId, req.body);
      res.status(204).end();
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateFav = async (req, res) => {
  try {
    const foundEntry = await Entry.findById(req.params.EntryId);
    if (foundEntry) {
      const modify = await Entry.findByIdAndUpdate(
        req.params.EntryId,
        req.body,
        {
          new: true,
        }
      );

      res.status(200).json(modify);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteEntry = async (req, res) => {
  try {
    const foundEntry = await Entry.findById(req.params.EntryId);
    if (foundEntry) {
      if (req.user._id.equals(foundEntry.user)) {
        await Entry.deleteOne(foundEntry);
        res.status(204).end();
      } else {
        res.status(404).json({ message: "You're not authorized!" });
      }
    } else {
      res.status(404).json({ message: "Entry deosn't exist!" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
