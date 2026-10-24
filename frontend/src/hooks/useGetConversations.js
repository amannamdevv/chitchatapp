import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);
	const { socket } = useSocketContext();
	const { selectedConversation } = useConversation();

	const getConversations = async () => {
		setLoading(true);
		try {
			const res = await fetch("/api/users");
			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			setConversations(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	const markConversationAsSeen = (userId) => {
		setConversations(prev => 
			prev.map(conv => 
				conv._id === userId 
					? { ...conv, hasUnseenMessages: false }
					: conv
			)
		);
	};

	useEffect(() => {
		getConversations();
	}, []);

	useEffect(() => {
		if (!socket) return;

		const handleMessagesSeen = () => {
			getConversations();
		};

		const handleNewMessage = (newMessage) => {
			// Update conversation list when new message arrives
			if (selectedConversation?._id !== newMessage.senderId) {
				setConversations(prev => 
					prev.map(conv => 
						conv._id === newMessage.senderId 
							? { ...conv, hasUnseenMessages: true }
							: conv
					)
				);
			}
		};

		socket.on("messagesSeen", handleMessagesSeen);
		socket.on("newMessage", handleNewMessage);

		return () => {
			socket.off("messagesSeen", handleMessagesSeen);
			socket.off("newMessage", handleNewMessage);
		};
	}, [socket, selectedConversation]);

	// Mark messages as seen when conversation is selected
	useEffect(() => {
		if (selectedConversation) {
			markConversationAsSeen(selectedConversation._id);
		}
	}, [selectedConversation]);

	return { loading, conversations };
};
export default useGetConversations;