const Notification = require("../../DB/models/Notification");
const User = require("../../DB/models/User");

exports.fetchNotifications = async (req, res) => {
  const allNotifications = await Notification.find();
  res.status(200).json(allNotifications);
};


exports.createNotification = async (req, res) => {
  try {
    const newNotification = await Notification.create(req.body);
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(501).json(error);
  }
};

exports.acceptFriend=async(req,res,next)=>{
    const {friendId,userId}=req.params;
    try{
        const friend = await User.findByIdAndUpdate(friendId,{$push:{friends:userId}},{new:true});
        const user= await User.findByIdAndUpdate(userId,{$push:{friends:friendId}},{new:true});
        res.status(200).json(user);
    }
    catch(error){res.status(501).json(error);}
}

exports.pending=async(req,res,next)=>{
  const {friendId,userId}=req.params;
  try{
    const user= await User.findByIdAndUpdate(userId,{$push:{notifications:friendId}},{new:true});
    res.status(200).json(user);
}
catch(error){res.status(501).json(error);}
}

exports.rejectFriend=async(req,res,next)=>{
  try {
    const { friendId } = req.params;
    const user = await User.findByIdAndUpdate(friendId, req.body, {
      new: true,
    }).select("-password");

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

exports.deleteNotification = async (req, res) => {
    const {notificationId}=req.params
  try {
    const foundNotification = await Notification.findById(notificationId);
    if (foundNotification) {
        await Notification.deleteOne(foundNotification);
        res.status(204).end();
    } else {
      res.status(404).json({ message: "Notification deosn't exist!" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
