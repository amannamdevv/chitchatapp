import React, { useEffect, useState } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import UserInfo from './UserInfo'
import { TiMessages } from 'react-icons/ti'
import { IoArrowBack } from 'react-icons/io5'
import useConversation from '../../zustand/useConversation'
import { useAuthContext } from '../../context/AuthContext'
import { useSocketContext } from '../../context/SocketContext'

const MessageContainer = ({ onBackToSidebar, showBackButton, isMobile }) => {

    const {selectedConversation, setSelectedConversation } = useConversation();
    const { onlineUsers } = useSocketContext();
    const isOnline = selectedConversation ? onlineUsers.includes(selectedConversation._id) : false;
    const [showUserInfo, setShowUserInfo] = useState(false);

    useEffect(() => {
      // Don't clear conversation on unmount for mobile
      if (!isMobile) {
        return () => setSelectedConversation(null);
      }
    },[setSelectedConversation, isMobile])

    const handleBackClick = () => {
        setSelectedConversation(null);
        if (onBackToSidebar) {
            onBackToSidebar();
        }
    };

  return (
    <div className={`flex flex-col glass-dark flex-1 ${isMobile ? 'min-w-0' : 'md:min-w-[450px]'}`}>
        { !selectedConversation ? ( <NoChatSelected isMobile={isMobile} />) : (
            <>
            {showUserInfo ? (
                <UserInfo 
                    user={selectedConversation} 
                    isOnline={isOnline} 
                    onClose={() => setShowUserInfo(false)} 
                />
            ) : (
                <>
                    <div 
                        className={`glass-effect backdrop-blur-md border-b border-white/10 flex items-center cursor-pointer hover:bg-white/5 transition-all ${isMobile ? 'px-3 py-2 gap-2' : 'px-6 py-3 gap-4'}`}
                        onClick={() => setShowUserInfo(true)}
                    >
                        {showBackButton && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleBackClick();
                                }}
                                className='text-white hover:text-cyan-400 transition-colors'
                            >
                                <IoArrowBack className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                            </button>
                        )}
                        <div className='avatar'>
                            <div className={`rounded-full ring-2 ring-cyan-400/50 ${isMobile ? 'w-8' : 'w-12'}`}>
                                <img 
                                    src={selectedConversation.profilePic} 
                                    alt="user avatar"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedConversation.fullName)}&background=random`;
                                    }}
                                />
                            </div>
                            {isOnline && (
                                <span className={`absolute bottom-0 right-0 bg-green-500 border-2 border-gray-800 rounded-full ${isMobile ? 'w-2 h-2' : 'w-3 h-3'}`}></span>
                            )}
                        </div>
                        <div className='flex-1 min-w-0'>
                            <h3 className={`text-white font-semibold mb-0.5 truncate ${isMobile ? 'text-sm' : 'text-base'}`}>{selectedConversation.fullName}</h3>
                            <div className='flex items-center gap-2'>
                                <span className={`text-xs font-medium ${isOnline ? 'text-green-400' : 'text-gray-400'}`}>
                                    {isOnline ? 'Online' : 'Offline'}
                                </span>
                                {!isMobile && (
                                    <>
                                        <span className='text-gray-500'>•</span>
                                        <p className='text-xs text-gray-400 truncate'>
                                            {selectedConversation.about || 'Hey there! I am using ChitChat'}
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <Messages isMobile={isMobile} />
                    <MessageInput isMobile={isMobile} />
                </>
            )}
            </>
        )}
    </div>
  )
}

export default MessageContainer



const NoChatSelected = ({ isMobile }) => {
  const { authUser } = useAuthContext();

	return (
		<div className={`flex items-center justify-center w-full h-full ${isMobile ? 'p-3' : 'p-4'}`}>
			<div className={`text-center flex flex-col items-center ${isMobile ? 'gap-3' : 'gap-4'}`}>
				<div className={`bg-gradient-to-r from-cyan-500 to-teal-600 rounded-full shadow-2xl ${isMobile ? 'p-3' : 'p-6'}`}>
					<TiMessages className={`text-white ${isMobile ? 'text-3xl' : 'text-6xl'}`} />
				</div>
				<div>
					<h2 className={`font-bold text-white mb-2 ${isMobile ? 'text-lg' : 'text-2xl'}`}>Welcome, {authUser.fullName}! 👋</h2>
					<p className={`text-gray-400 ${isMobile ? 'text-sm' : 'text-base'}`}>Select a conversation to start messaging</p>
				</div>
			</div>
		</div>
	);
};