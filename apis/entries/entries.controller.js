const Entry = require("../../DB/models/Entry");

exports.fetchEntries = async (req, res) => {
  const allEntries = await Entry.find().populate("friends");
  res.status(200).json(allEntries);
};

exports.createEntry = async (req, res) => {
  try {
    const newEntry = await Entry.create(req.body);
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(501).json(error);
  }
};

exports.updateEntry = async (req, res) => {
  try {
    const foundEntry = await Entry.findById(req.params.EntryId);
    if (foundEntry) {
      if (req.user._id.equals(foundEntry.user)) {
        await Entry.findByIdAndUpdate(req.params.EntryId, req.body);
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
      console.log("received: ", req.body);
      console.log("sent: ", modify.isFav);

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
