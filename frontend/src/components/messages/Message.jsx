import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../utils/extractTime';
import { BsCheck, BsCheckAll } from 'react-icons/bs';

const Message = ({message, isMobile}) => {

  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formatedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const shakeClass = message.shouldShake ? "shake" : "";

  const getStatusIcon = () => {
    if (!fromMe) return null;
    
    switch(message.status) {
      case 'sent':
        return <BsCheck className='text-gray-400' />;
      case 'delivered':
        return <BsCheckAll className='text-gray-400' />;
      case 'seen':
        return <BsCheckAll className='text-blue-400' />;
      default:
        return null;
    }
  };

  return (
    <div className={`chat ${chatClassName} ${isMobile ? 'mobile:px-1 px-2' : ''}`}>
        <div className='chat-image avatar'>
          <div className={`rounded-full ring-2 ring-cyan-400/30 ${isMobile ? 'mobile:w-7 w-8' : 'w-10'}`}>
            <img 
                src={profilePic} 
                alt="chat avatar"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(fromMe ? authUser.fullName : selectedConversation?.fullName || 'User')}&background=random`;
                }}
            />
          </div>
        </div>

        <div className={`chat-bubble text-white ${shakeClass} pb-2 shadow-lg break-words ${isMobile ? 'mobile:text-sm mobile:max-w-[80%] text-sm max-w-[85%]' : 'text-base max-w-xs'} ${fromMe ? 'bg-gradient-to-r from-cyan-500 to-teal-600' : 'glass-effect'}`}>
          {message.message}
        </div>
        <div className={`chat-footer opacity-70 flex gap-1 items-center text-gray-400 ${isMobile ? 'mobile:text-xs text-xs' : 'text-xs'}`}>
          {formatedTime}
          {getStatusIcon()}
        </div>
    </div>
  )
}

export default Message