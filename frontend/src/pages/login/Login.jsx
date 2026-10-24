import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin';

const Login = () => {
    const [isMobile, setIsMobile] = useState(false)
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const { loading, login } = useLogin()

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024)
        }
        
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username, password);
    }

  return (
    <div className={`${isMobile ? 'min-h-screen flex items-center justify-center px-4 py-6' : 'flex flex-col items-center justify-center min-w-96 mx-auto'}`}>
        <div className={`w-full rounded-3xl shadow-2xl glass-effect ${isMobile ? 'p-6 max-w-sm mx-auto' : 'p-8'}`}>
            <div className={`text-center ${isMobile ? 'mb-6' : 'mb-6'}`}>
                <h1 className={`font-bold text-white mb-2 ${isMobile ? 'text-3xl' : 'text-4xl'}`}>
                    Welcome Back
                </h1>
                <p className={`text-gray-300 ${isMobile ? 'text-sm' : 'text-sm'}`}>Sign in to continue to ChitChat</p>
            </div>

            <form onSubmit={handleSubmit} className={`${isMobile ? 'space-y-4' : 'space-y-4'}`}>
                <div>
                    <label className='label'>
                        <span className={`label-text text-white font-medium ${isMobile ? 'text-base' : 'text-base'}`}>Username</span>
                    </label>
                    <input 
                        type='text' 
                        className={`w-full input input-bordered glass-dark text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-all ${isMobile ? 'h-12 text-base' : 'h-11 text-base'}`} 
                        placeholder='Enter username' 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div>
                    <label className='label'>
                        <span className={`label-text text-white font-medium ${isMobile ? 'text-base' : 'text-base'}`}>Password</span>
                    </label>
                    <input
                        type='password' 
                        className={`w-full input input-bordered glass-dark text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-all ${isMobile ? 'h-12 text-base' : 'h-11 text-base'}`} 
                        placeholder='Enter Password' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div>
                    <button className={`btn btn-block mt-6 bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white border-none font-semibold transition-all shadow-lg ${isMobile ? 'h-12 text-base' : 'h-11 text-base'}`}
                        disabled= {loading}
                    >
                    {loading ? <span className='loading loading-spinner'></span> : "Sign In"}
                    </button>
                </div>

                <div className={`text-center ${isMobile ? 'mt-4' : 'mt-4'}`}>
                    <Link to='/signup' className={`text-gray-300 hover:text-white transition-colors ${isMobile ? 'text-sm' : 'text-sm'}`}>
                        Don't have an account? <span className='font-semibold text-cyan-400'>Sign Up</span>
                    </Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login