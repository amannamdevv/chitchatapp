import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../hooks/useGetConversations';

const Conversations = ({ searchTerm = "", onSelectConversation, isMobile }) => {

  const {loading, conversations} = useGetConversations();
  
  const filteredConversations = searchTerm 
    ? conversations.filter(c => c.fullName.toLowerCase().includes(searchTerm.toLowerCase()))
    : conversations;

  return (
    <div className='flex flex-col overflow-auto flex-1'>

    {filteredConversations.map((conversation, idx) => (
      <Conversation 
        key={conversation._id}
        conversation={conversation}
        lastIdx ={idx === filteredConversations.length - 1}
        onSelect={onSelectConversation}
        isMobile={isMobile}
      />
    ))}

        {loading ? <span className='loading loading-spinner mx-auto mt-4'></span> : null}
        {!loading && filteredConversations.length === 0 && searchTerm && (
          <p className='text-center text-gray-400 text-sm mt-4'>No users found</p>
        )}
    </div>
  )
}

export default Conversations

// import React from 'react'
// import Conversation from './Conversation'

// const Conversations = () => {
//   return (
//     <div className='py-2 flex flex-col overflow-auto'>
//         <Conversation />
//         <Conversation />
//         <Conversation />
//         <Conversation />
//         <Conversation />
//         <Conversation />
//     </div>
//   )
// }

// export default Conversations