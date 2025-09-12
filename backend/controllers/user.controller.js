import User from "../models/User.js";
import FriendReq from "../models/FriendRequest.js"

export const getRecommendatedUsers = async (req, res) => {
    // Array of {Name,email,recommended by which friend_name}
  try {
    const user = req.user;
    const userFriends = user.friends; // array of ObjectIds

    // 1. Get first-degree connections
    const firstConnections = await User.find({
      _id: { $in: userFriends }
    });

    // 2. Collect friends-of-friends
    const secondExpectedFriends = new Map();

    firstConnections.forEach(myFriend => {
      myFriend.friends.forEach(friend => {
        if (
          friend.toString() !== user._id.toString() && // not myself
          !userFriends.some(f => f.toString() === friend.toString()) // not already a friend
        ) {
          const existingList = secondExpectedFriends.get(friend.toString()) || [];
          existingList.push(myFriend.name);
          secondExpectedFriends.set(friend.toString(), existingList);
        }
      });
    });

    // 3. Fetch second-degree connections
    const secondConnectionsFromDb = await User.find({
      _id: { $in: Array.from(secondExpectedFriends.keys()) }
    }).select("name email");

    const finalSecondConnections = secondConnectionsFromDb.map(connection => ({
      name: connection.name,
      email: connection.email,
      closeFirstFriends: secondExpectedFriends.get(connection._id.toString())
    }));

    return res.status(200).json({
      success: true,
      message: "Successfully found second connections",
      data: finalSecondConnections
    });

  } catch (error) {
    console.error("Error in getting recommendations:", error);
    return res.status(500).json({
      success: false,
      message: "Something happened while generating recommendations"
    });
  }
};



export const getMyFriends=async(req,res)=>{
    try {
        const user=req.user;
        const userFriends=user.friends;

        const firstConnections=await User.find({
            _id:{$in:userFriends}
        });
 
        return res.status(200).json({success:true,message:"Successfully fetched friends data",data:firstConnections});


    } catch (error) {
        console.error("Error happend while fetching friends data",error);
        return res.status(500).json({success:false,message:"Not able to fetch friends data at the moment"});
    }
}


export const sendFriendReq = async (req, res) => {
  try {
    const sender = req.user._id;
    const receiver = req.params.id; 

    if (sender.toString() === receiver) {
      return res.status(400).json({ success: false, message: "You cannot send friend req to yourself" });
    }


    // Check for valid recipient
    const validRecipient = await User.findById(receiver);
    if (!validRecipient) {
      return res.status(400).json({ success: false, message: "Invalid recipient" });
    }

    // Fetch sender to check friendship
    if (req.user.friends.includes(receiver)) {
      return res.status(400).json({ success: false, message: "You both are already friends" });
    }

    // Check if request already exists (both ways)
    const existingReq = await FriendReq.findOne({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender }
      ]
    });

    if (existingReq) {
      return res.status(409).json({ 
        success: false, 
        message: "Friend request already exists between both users" 
      });
    }

    // Create new friend request
    await FriendReq.create({ sender, receiver });

    return res.status(201).json({ 
      success: true, 
      message: "Friend request sent successfully" 
    });

  } catch (error) {
    console.error("Error happened while sending friend request:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Not able to send friend request at the moment" 
    });
  }
};

export const acceptFriendReq = async (req, res) => {
  try {
    const friendReqId = req.params.id;
    const friendReq = await FriendReq.findById(friendReqId);

    if (!friendReq) {
      return res.status(400).json({ success: false, message: "Friend request not found" });
    }

    const senderId = friendReq.sender.toString();
    const receiverId = friendReq.receiver.toString();
    const userId = req.user._id.toString();

    // Ensure logged-in user is the receiver
    if (userId !== receiverId) {
      return res.status(403).json({ success: false, message: "You are not authorized to accept this request" });
    }

    // Update FriendReq status
    await FriendReq.findByIdAndUpdate(friendReqId, { status: "accepted" });

    // Add each other to friends list (atomic updates)
    await User.findByIdAndUpdate(receiverId, { $addToSet: { friends: senderId } });
    await User.findByIdAndUpdate(senderId, { $addToSet: { friends: receiverId } });

    return res.status(200).json({ success: true, message: "You are now friends with each other" });

  } catch (error) {
    console.error("Error occurred while accepting request:", error);
    return res.status(500).json({ success: false, message: "Unable to accept the request at the moment" });
  }
};

export const getAllFriendReqs=async(req,res)=>{
  try {

    const user=req.user
    //Filtered by pending req of receiver and sort by most recent first
    const incomingFriendReqs=await FriendReq.find({receiver:user._id,status:"pending"}).populate("sender","name profilePic").sort({createdAt:-1})
     //Filtered by accepted req ,sent by user and sort by most recent first
    const acceptedFriendReqs=await FriendReq.find({sender:user._id,status:"accepted"}).populate("receiver","name profilePic").sort({createdAt:-1})


    return res.status(200).json({success:true,message:"Successfully fetched all the friend requests",data:[incomingFriendReqs,acceptedFriendReqs]})

    
  } catch (error) {

    console.error("Error occured while fetching the friend requests:",error)
    return res.status(500).json({success:false,message:"Unable to fetch friendReqs at the moment"});
    
  }
}

export const outGoingFriendReqs=async(req,res)=>{
  try {
    const sender = req.user._id
  const outGoingReqs=await FriendReq.find({sender});
  return res.status(200).json({success:true,message:"Successfully fetched all the outgoing friend requests",data:outGoingReqs});

  } catch (error) {
    console.error("Error occured while fetching outgoing reqs:",error);
    return res.status(500).json({success:false,message:"Unable to fetch outgoing friend reqs at the moment"});
  }
}
