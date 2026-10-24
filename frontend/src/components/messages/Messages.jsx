import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages';
import MessageSkeleton from '../skeletons/MessageSkeletons';
import useListenMessages from '../../hooks/useListenMessages';
import useConversation from '../../zustand/useConversation';
import { TiMessages } from 'react-icons/ti';

const Messages = ({ isMobile }) => {

  const { messages, loading } = useGetMessages();
  const { selectedConversation } = useConversation();
  useListenMessages();
  const lastMessageRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth"});
    },100)
  },[messages])

  return (
    <div 
      className={`flex-1 overflow-auto text-white relative ${isMobile ? 'mobile:px-3 px-4' : 'px-4'}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='400' height='250' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.03'%3E%3Ctext x='200' y='80' text-anchor='middle' font-size='12' font-family='Arial'%3E💬 Aman Namdev 💬%3C/text%3E%3Ctext x='200' y='170' text-anchor='middle' font-size='10' font-family='Arial'%3E🚀 ChitChat Developer 🚀%3C/text%3E%3C/g%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: isMobile ? '350px 220px' : '450px 280px'
      }}
    >
        {!loading && messages.length > 0 && messages.map((message) => (
            <div key={message._id}
              ref={lastMessageRef}
              className={`${isMobile ? 'mobile:mb-3 mb-4' : 'mb-4'}`}
            >
              <Message message={message} isMobile={isMobile} />
            </div>
        ))}

        {loading && [...Array(4)].map((_, idx) => <MessageSkeleton key={idx} />)}

        {!loading && messages.length === 0 && (
          <div className='flex items-center justify-center h-full'>
            <div className={`text-center flex flex-col items-center ${isMobile ? 'mobile:gap-2 gap-3' : 'gap-3'}`}>
              <div className={`bg-gradient-to-r from-cyan-500/20 to-teal-600/20 rounded-full ${isMobile ? 'mobile:p-3 p-4' : 'p-4'}`}>
                <TiMessages className={`text-cyan-400 ${isMobile ? 'mobile:text-3xl text-4xl' : 'text-5xl'}`} />
              </div>
              <div>
                <p className={`font-semibold text-white mb-1 ${isMobile ? 'mobile:text-base text-lg' : 'text-lg'}`}>No messages yet</p>
                <p className={`text-gray-400 ${isMobile ? 'mobile:text-sm text-sm' : 'text-sm'}`}>Start the conversation with {selectedConversation?.fullName}</p>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default Messages