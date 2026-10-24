import React from 'react'
import { IoArrowBack } from 'react-icons/io5'

const UserInfo = ({ user, isOnline, onClose }) => {
    return (
        <div className='flex flex-col h-full'>
            <div className='glass-effect backdrop-blur-md px-6 py-3 border-b border-white/10 flex items-center gap-4'>
                <button 
                    onClick={onClose}
                    className='text-white hover:text-cyan-400 transition-colors'
                >
                    <IoArrowBack className='w-6 h-6' />
                </button>
                <h3 className='text-white font-semibold text-base'>User Info</h3>
            </div>

            <div className='flex-1 overflow-auto p-6'>
                <div className='flex flex-col items-center gap-4 mb-8'>
                    <div className='avatar relative'>
                        <div className='w-32 rounded-full ring-4 ring-cyan-400/50'>
                            <img 
                                src={user.profilePic} 
                                alt="user avatar"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=random`;
                                }}
                            />
                        </div>
                        {isOnline && (
                            <span className='absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-gray-800 rounded-full'></span>
                        )}
                    </div>
                    <div className='text-center'>
                        <h2 className='text-2xl font-bold text-white mb-1'>{user.fullName}</h2>
                        <p className={`text-sm font-medium ${isOnline ? 'text-green-400' : 'text-gray-400'}`}>
                            {isOnline ? 'Online' : 'Offline'}
                        </p>
                    </div>
                </div>

                <div className='space-y-4'>
                    <div className='glass-effect p-4 rounded-xl'>
                        <h4 className='text-xs text-gray-400 uppercase mb-2'>Username</h4>
                        <p className='text-white'>@{user.username}</p>
                    </div>

                    <div className='glass-effect p-4 rounded-xl'>
                        <h4 className='text-xs text-gray-400 uppercase mb-2'>About</h4>
                        <p className='text-white'>{user.about || 'Hey there! I am using ChitChat'}</p>
                    </div>

                    <div className='text-center mt-6'>
                        <p className='text-xs text-gray-500 font-extralight tracking-widest opacity-80'>Made by <span className='text-gray-300 font-light'>Aman Namdev</span></p>
                    </div>

                    {user.email && (
                        <div className='glass-effect p-4 rounded-xl'>
                            <h4 className='text-xs text-gray-400 uppercase mb-2'>Email</h4>
                            <p className='text-white'>{user.email}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserInfo
