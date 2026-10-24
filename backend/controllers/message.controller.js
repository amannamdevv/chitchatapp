import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try{
        const { message } = req.body;
        const { id: receiverId } = req.params;

        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants :{ $all: [senderId, receiverId] },
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
            status: 'sent'
        })

        if(newMessage){
            conversation.messages.push(newMessage._id);
            conversation.lastMessage = newMessage._id;
        }

        await Promise.all([conversation.save(), newMessage.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId);
        console.log('Receiver socket ID:', receiverSocketId);
        if (receiverSocketId) {
            newMessage.status = 'delivered';
            await newMessage.save();
            console.log('Emitting newMessage to:', receiverSocketId);
            io.to(receiverSocketId).emit("newMessage", newMessage);
        } else {
            console.log('Receiver not online, socket ID not found');
        }

        res.status(201).json(newMessage)

    } catch(error){
        console.error("Error in sendMessage controller", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}

export const getMessages = async (req, res) => {
    try{

        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants :{ $all: [senderId, userToChatId] },
        }).populate("messages");

        if(!conversation){
            return res.status(200).json([])
        }

        // Mark messages as seen
        const updatedMessages = await Message.updateMany(
            { 
                receiverId: senderId, 
                senderId: userToChatId,
                status: { $ne: 'seen' }
            },
            { status: 'seen' }
        );

        // Notify sender that messages were seen
        if (updatedMessages.modifiedCount > 0) {
            const senderSocketId = getReceiverSocketId(userToChatId);
            if (senderSocketId) {
                io.to(senderSocketId).emit("messagesSeen", { userId: senderId });
            }
        }

        res.status(200).json(conversation.messages);

    } catch(error){
        console.error("Error in getMessages controller", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}