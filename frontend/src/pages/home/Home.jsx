import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer'
import useConversation from '../../zustand/useConversation'

const Home = () => {
  const [showSidebar, setShowSidebar] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const { selectedConversation } = useConversation()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Mobile/tablet logic
  const shouldShowSidebar = isMobile ? showSidebar : true
  const shouldShowMessages = isMobile ? !showSidebar : true

  useEffect(() => {
    if (isMobile && selectedConversation) {
      setShowSidebar(false)
    }
  }, [selectedConversation, isMobile])

  return (
    <div className={`${isMobile ? 'min-h-screen flex items-center justify-center px-4 py-6' : 'flex items-center justify-center'}`}>
      <div className={`flex ${isMobile ? 'h-[calc(100vh-3rem)] w-full max-w-sm mx-auto rounded-3xl' : 'sm:h-[500px] md:h-[600px] lg:h-[650px] w-full max-w-6xl rounded-3xl'} overflow-hidden shadow-2xl glass-effect`}>
        {shouldShowSidebar && (
          <Sidebar 
            onSelectConversation={() => isMobile && setShowSidebar(false)}
            onBackToSidebar={() => setShowSidebar(true)}
            isMobile={isMobile}
          />
        )}
        {shouldShowMessages && (
          <MessageContainer 
            onBackToSidebar={() => setShowSidebar(true)}
            showBackButton={isMobile && selectedConversation}
            isMobile={isMobile}
          />
        )}
      </div>
    </div>
  )
}

export default Home