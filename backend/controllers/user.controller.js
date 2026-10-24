import User from "../models/user.model.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {

        const loggedInUserId = req.user._id;

        const filteredUsers = await User.find({ _id : { $ne : loggedInUserId }}).select("-password");

        // Get conversations with last messages
        const conversations = await Conversation.find({
            participants: loggedInUserId
        }).populate('lastMessage').lean();

        // Add conversation data to users
        const usersWithConversationData = await Promise.all(filteredUsers.map(async (user) => {
            const conversation = conversations.find(conv => 
                conv.participants.some(p => p.toString() === user._id.toString())
            );
            
            const userObj = user.toObject ? user.toObject() : user;
            
            // Check if there are unseen messages from this user
            let hasUnseenMessages = false;
            let isLastMessageFromCurrentUser = false;
            
            if (conversation && conversation.lastMessage) {
                const unseenCount = await Message.countDocuments({
                    _id: { $in: conversation.messages },
                    senderId: user._id,
                    receiverId: loggedInUserId,
                    status: { $ne: 'seen' }
                });
                hasUnseenMessages = unseenCount > 0;
                isLastMessageFromCurrentUser = conversation.lastMessage.senderId.toString() === loggedInUserId.toString();
            }
            
            return {
                ...userObj,
                lastMessage: conversation?.lastMessage || null,
                hasUnseenMessages,
                isLastMessageFromCurrentUser,
                lastMessageTime: conversation?.lastMessage?.createdAt || conversation?.updatedAt || null
            };
        }));

        // Sort by last message time (most recent first)
        usersWithConversationData.sort((a, b) => {
            const timeA = a.lastMessageTime ? new Date(a.lastMessageTime) : new Date(0);
            const timeB = b.lastMessageTime ? new Date(b.lastMessageTime) : new Date(0);
            return timeB - timeA;
        });

        res.status(200).json(usersWithConversationData);

    } catch (error) {
        console.error("Error in getUserForSidebar",error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}