import React, { useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversations'
import toast from 'react-hot-toast';

const SearchInput = ({ onSearchChange, isMobile }) => {

  const [search, setSearch] = useState("");
  const {setSelectedConversation} = useConversation()
  const {conversations} = useGetConversations();

  const handleSearch = (searchTerm) => {
    setSearch(searchTerm);
    onSearchChange(searchTerm);
    
    if(!searchTerm) {
      return;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!search) return;
    if(search.length < 3){
      return toast.error("Search term must be at least 3 characters long")
    }

    const conversation = conversations.find(c => c.fullName.toLowerCase().includes(search.toLowerCase()))

    if(conversation){
      setSelectedConversation(conversation)
    } else {
      toast.error("No User found with that name")
    }
  } 
  
  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2'>
        <input 
            type="text" 
            placeholder='Search users...' 
            className={`input input-bordered rounded-full flex-1 glass-dark text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none touch-manipulation ${isMobile ? 'h-11 text-base' : 'h-10 text-base'}`}
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            autoComplete='off'
        />
        <button type='submit' className={`btn btn-circle bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white border-none shadow-lg min-h-0 touch-manipulation ${isMobile ? 'h-11 w-11' : 'h-10 w-10'}`}>
            <IoSearchSharp className={`${isMobile ? 'w-5 h-5' : 'w-5 h-5'}`}/>
        </button>
    </form>
  )
}

export default SearchInput