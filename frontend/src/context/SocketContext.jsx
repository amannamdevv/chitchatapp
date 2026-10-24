import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { authUser } = useAuthContext();

	useEffect(() => {
		if (authUser) {
			const socketURL = import.meta.env.MODE === "development" ? "http://localhost:5000" : "https://reactproject-chitchat.onrender.com";
			console.log('Connecting to socket:', socketURL);
			
			const socket = io(socketURL, {
                query: {
					userId: authUser._id,
				},
				transports: ['websocket', 'polling'],
				forceNew: true
            });

			setSocket(socket);

			socket.on('connect', () => {
				console.log('Socket connected successfully:', socket.id);
			});

			socket.on('connect_error', (error) => {
				console.error('Socket connection error:', error);
			});

			socket.on('disconnect', () => {
				console.log('Socket disconnected');
			});

			// socket.on() is used to listen to the events. can be used both on client and server side
            socket.on("getOnlineUsers", (users) => {
				console.log('Online users updated:', users);
				setOnlineUsers(users);
			});


			return () => {
				console.log('Cleaning up socket connection');
				socket.close();
			};
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [authUser]);

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};