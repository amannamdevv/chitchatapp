import React from 'react'
import useConversation from '../../zustand/useConversation'
import { useSocketContext } from '../../context/SocketContext';
import { BsCheckAll } from 'react-icons/bs';

const Conversation = ({conversation, lastIdx, onSelect, isMobile}) => {

    const { selectedConversation, setSelectedConversation } = useConversation();
    const isSelected = selectedConversation?._id === conversation._id;
    const { onlineUsers} = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id);

    const handleClick = () => {
        setSelectedConversation(conversation);
        if(onSelect) onSelect();
    };

    const formatTime = (date) => {
        if (!date) return '';
        const messageDate = new Date(date);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (messageDate.toDateString() === today.toDateString()) {
            return messageDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        } else if (messageDate.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        } else {
            return messageDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
    };

  return (
    <>
        <div className={`flex items-center hover:glass-effect rounded-xl cursor-pointer transition-all duration-200 ${isMobile ? 'gap-3 p-3 touch-manipulation' : 'gap-3 p-3'}
                ${isSelected ? "glass-effect shadow-lg" : ""}
            `}
             onClick={handleClick}
            >
            <div className={`avatar ${isOnline ? "online" : ""}`}>
                <div className={`rounded-full ring-2 ring-cyan-400/30 ${isMobile ? 'w-12' : 'w-12'}`}>
                    <img 
                        src={conversation.profilePic} 
                        alt="user avatar"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(conversation.fullName)}&background=random`;
                        }}
                    />
                </div>
            </div>

            <div className='flex flex-col flex-1 min-w-0'>
                <div className='flex items-center justify-between gap-2'>
                    <p className={`font-semibold text-white truncate ${isMobile ? 'text-base' : 'text-base'}`}>{conversation.fullName}</p>
                    <span className={`text-gray-500 flex-shrink-0 ${isMobile ? 'text-xs' : 'text-xs'}`}>
                        {formatTime(conversation.lastMessageTime)}
                    </span>
                </div>
                <div className='flex items-center justify-between gap-2'>
                    <p className={`text-gray-400 truncate flex-1 ${isMobile ? 'text-sm' : 'text-xs'}`}>
                        {conversation.lastMessage?.message || conversation.about || 'No messages yet'}
                    </p>
                    <div className='flex items-center gap-1 flex-shrink-0'>
                        {conversation.isLastMessageFromCurrentUser && (
                            <BsCheckAll className={`text-gray-400 ${isMobile ? 'w-4 h-4' : 'w-3 h-3'}`} />
                        )}
                        {conversation.hasUnseenMessages && (
                            <div className={`rounded-full bg-green-500 ${isMobile ? 'w-2 h-2' : 'w-2 h-2'}`}></div>
                        )}
                    </div>
                </div>
            </div>
        </div> 
        {!lastIdx && <div className='divider my-1 py-0 h-1' />} 
    </>
  )
}

export default Conversation