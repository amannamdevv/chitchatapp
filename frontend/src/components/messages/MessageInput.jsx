import React, { useState } from 'react'
import { BsSend} from 'react-icons/bs'
import useSendMessage from '../../hooks/useSendMessage'

const MessageInput = ({ isMobile }) => {

  const [message, setMessage] = useState("")
  const {loading, sendMessage} = useSendMessage()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!message) return;
    
    await sendMessage(message);
    setMessage('');

  }

  return (
    <form className={`border-t border-white/10 safe-area-inset ${isMobile ? 'px-4 py-4' : 'px-4 py-3'}`} onSubmit={handleSubmit}>
      <div className='w-full relative'>
        <input 
          type="text"  
          className={`border border-white/20 rounded-full block w-full glass-dark text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-all touch-manipulation ${isMobile ? 'p-4 pr-14 text-base pl-5' : 'pl-5 p-3 pr-12 text-sm'}`} 
          placeholder='Type a message...'
          value={message}
          onChange={(e) => setMessage(e.target.value)}  
          autoComplete='off'
        />
      
        <button 
          type='submit' 
          className={`absolute inset-y-0 end-0 flex items-center justify-center text-cyan-400 hover:text-cyan-300 transition-colors touch-manipulation mr-2 ${isMobile ? 'w-14 h-full' : 'w-10 h-full'}`}
          disabled={!message.trim()}
        >
          {loading ? <div className='loading loading-spinner' /> : <BsSend className={`${isMobile ? 'w-5 h-5' : 'w-5 h-5'}`}/>}
        </button>
      </div>
    </form>
  )
}

export default MessageInput