import React, { useState } from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import LogoutButton from './LogoutButton'
import { FaUserCircle } from 'react-icons/fa'
import { useAuthContext } from '../../context/AuthContext'
import UserInfo from '../messages/UserInfo'

const Sidebar = ({ onSelectConversation, onBackToSidebar, isMobile }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showMyInfo, setShowMyInfo] = useState(false);
  const { authUser } = useAuthContext();

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleConversationSelect = () => {
    setSearchTerm("");
    if (onSelectConversation) {
      onSelectConversation();
    }
  };

  if (showMyInfo) {
    return (
      <div className={`border-r border-white/10 flex flex-col glass-dark ${isMobile ? 'w-full' : 'w-80'}`}>
        <UserInfo user={authUser} isOnline={true} onClose={() => setShowMyInfo(false)} />
      </div>
    );
  }

  return (
    <div className={`border-r border-white/10 flex flex-col glass-dark ${isMobile ? 'w-full h-full rounded-l-3xl' : 'w-80 p-4'}`}>
        <div className={`${isMobile ? 'p-4 pb-0' : ''}`}>
            <div className={`flex items-center justify-between ${isMobile ? 'mb-4' : 'mb-6'}`}>
                <div>
                    <h2 className={`font-bold text-white mb-1 ${isMobile ? 'text-xl' : 'text-2xl'}`}>Messages</h2>
                    <p className={`text-gray-400 ${isMobile ? 'text-sm' : 'text-xs'}`}>Start a conversation</p>
                </div>
                <button
                  onClick={() => setShowMyInfo(true)}
                  className='text-cyan-400 hover:text-cyan-300 transition-colors'
                >
                  <FaUserCircle className={`${isMobile ? 'w-8 h-8' : 'w-9 h-9'}`} />
                </button>
            </div>
            <SearchInput onSearchChange={handleSearchChange} isMobile={isMobile} />
            <div className='divider px-3 my-2'></div>
        </div>
        <div className={`flex-1 overflow-hidden ${isMobile ? 'px-4' : ''}`}>
            <Conversations 
              searchTerm={searchTerm} 
              onSelectConversation={handleConversationSelect}
              isMobile={isMobile}
            />
        </div>
        <div className={`${isMobile ? 'p-4 pt-0' : ''}`}>
            <LogoutButton isMobile={isMobile} />
        </div>
    </div>
  )
}

export default Sidebar