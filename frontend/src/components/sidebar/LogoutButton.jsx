import React from 'react'
import { BiLogOut } from 'react-icons/bi'
import useLogout from '../../hooks/useLogout'

const LogoutButton = ({ isMobile }) => {

  const {loading, logout} = useLogout();

  return (
    <div className='mt-auto pt-4 border-t border-white/10'>
        {!loading ? (
          <button 
            className={`flex items-center gap-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-white transition-all w-full touch-manipulation ${isMobile ? 'px-4 py-3' : 'px-4 py-2'}`}
            onClick={logout}
          >
            <BiLogOut className={`${isMobile ? 'w-5 h-5' : 'w-5 h-5'}`}/>
            <span className={`font-medium ${isMobile ? 'text-base' : 'text-base'}`}>Logout</span>
          </button>
        ) : (
          <div className='flex justify-center'>
            <span className='loading loading-spinner'></span>
          </div>
        )}
    </div>
  )
}

export default LogoutButton;