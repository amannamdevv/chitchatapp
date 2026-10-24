import React, { useState, useEffect } from 'react'
import GenderCheckbox from './GenderCheckbox'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup';

const SignUp = () => {
    const [isMobile, setIsMobile] = useState(false)

    const [ inputs, setInputs ] = useState({
        fullName: '',
        username: '',
        password: '',
        confirmPassword: '',
        gender: '',
        email: '',
        about: ''
    });

    const { loading, signup } = useSignup();

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024)
        }
        
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const handleCheckboxChange = (gender) => {
        setInputs({...inputs, gender })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(inputs)
    }

  return (
    <div className={`${isMobile ? 'min-h-screen py-6 px-4' : 'flex items-center justify-center min-h-screen p-4'}`}>
        <div className={`w-full rounded-3xl shadow-2xl glass-effect ${isMobile ? 'p-6 max-w-sm mx-auto my-auto' : 'p-8 max-w-4xl'}`}>
            <div className={`text-center ${isMobile ? 'mb-6' : 'mb-6'}`}>
                <h1 className={`font-bold text-white mb-2 ${isMobile ? 'text-3xl' : 'text-4xl'}`}>
                    Create Account
                </h1>
                <p className={`text-gray-300 ${isMobile ? 'text-sm' : 'text-sm'}`}>Join ChitChat and start connecting with friends</p>
            </div>

            <div className={`${isMobile ? 'max-h-[26rem] overflow-y-auto pr-2' : ''}`}>
                <form onSubmit={handleSubmit} className={`${isMobile ? 'space-y-4' : 'space-y-4'}`}>
                    {/* Row 1: Full Name & Username */}
                    <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 md:grid-cols-2 gap-4'}`}>
                        <div>
                            <label className='label pb-1'>
                                <span className={`label-text text-white font-medium ${isMobile ? 'text-base' : 'text-sm'}`}>Full Name *</span>
                            </label>
                            <input 
                                type='text' 
                                className={`w-full input input-bordered glass-dark text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-all ${isMobile ? 'h-12 text-base' : 'h-11 text-base'}`} 
                                placeholder='John Doe' 
                                value = { inputs.fullName }
                                onChange = { e => setInputs({...inputs, fullName: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label className='label pb-1'>
                                <span className={`label-text text-white font-medium ${isMobile ? 'text-base' : 'text-sm'}`}>Username *</span>
                            </label>
                            <input 
                                type='text' 
                                className={`w-full input input-bordered glass-dark text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-all ${isMobile ? 'h-12 text-base' : 'h-11 text-base'}`} 
                                placeholder='johndoe123' 
                                value = { inputs.username }
                                onChange = { e => setInputs({...inputs, username: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    {/* Row 2: Password & Confirm Password */}
                    <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 md:grid-cols-2 gap-4'}`}>
                        <div>
                            <label className='label pb-1'>
                                <span className={`label-text text-white font-medium ${isMobile ? 'text-base' : 'text-sm'}`}>Password *</span>
                            </label>
                            <input 
                                type='password' 
                                className={`w-full input input-bordered glass-dark text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-all ${isMobile ? 'h-12 text-base' : 'h-11 text-base'}`} 
                                placeholder='Min 6 characters' 
                                value = { inputs.password }
                                onChange = { e => setInputs({...inputs, password: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label className='label pb-1'>
                                <span className={`label-text text-white font-medium ${isMobile ? 'text-base' : 'text-sm'}`}>Confirm Password *</span>
                            </label>
                            <input 
                                type='password' 
                                className={`w-full input input-bordered glass-dark text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-all ${isMobile ? 'h-12 text-base' : 'h-11 text-base'}`} 
                                placeholder='Re-enter password' 
                                value = { inputs.confirmPassword }
                                onChange = { e => setInputs({...inputs, confirmPassword: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    {/* Row 3: Gender & Email */}
                    <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 md:grid-cols-2 gap-4'}`}>
                        <div>
                            <label className='label pb-1'>
                                <span className={`label-text text-white font-medium ${isMobile ? 'text-base' : 'text-sm'}`}>Gender *</span>
                            </label>
                            <GenderCheckbox onCheckboxChange = {handleCheckboxChange} selectedGender = {inputs.gender} />
                        </div>

                        <div>
                            <label className='label pb-1'>
                                <span className={`label-text text-white font-medium ${isMobile ? 'text-base' : 'text-sm'}`}>Email</span>
                                <span className={`text-gray-400 ${isMobile ? 'text-sm' : 'text-xs'}`}> (Optional)</span>
                            </label>
                            <input 
                                type='email' 
                                className={`w-full input input-bordered glass-dark text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-all ${isMobile ? 'h-12 text-base' : 'h-11 text-base'}`} 
                                placeholder='your.email@example.com' 
                                value = { inputs.email || '' }
                                onChange = { e => setInputs({...inputs, email: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Row 4: About (Full Width) */}
                    <div>
                        <label className='label pb-1'>
                            <span className={`label-text text-white font-medium ${isMobile ? 'text-base' : 'text-sm'}`}>About</span>
                            <span className={`text-gray-400 ${isMobile ? 'text-sm' : 'text-xs'}`}> (Optional)</span>
                        </label>
                        <textarea 
                            className={`w-full textarea textarea-bordered glass-dark text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-all resize-none ${isMobile ? 'text-base h-20' : 'text-sm'}`} 
                            placeholder='Tell us about yourself...' 
                            rows={isMobile ? '3' : '3'}
                            maxLength='150'
                            value = { inputs.about }
                            onChange = { e => setInputs({...inputs, about: e.target.value })}
                        />
                        <p className={`text-cyan-400 text-right mt-1 ${isMobile ? 'text-sm' : 'text-xs'}`}>{inputs.about.length}/150</p>
                    </div>

                    {/* Submit Button */}
                    <div className={`${isMobile ? 'pt-2' : 'pt-2'}`}>
                        <button 
                            type='submit'
                            className={`btn btn-block bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white border-none font-semibold transition-all shadow-lg ${isMobile ? 'h-12 text-base' : 'h-12 text-base'}`} 
                            disabled={loading}
                        >
                            {loading ? <span className='loading loading-spinner'></span> : "Create Account"}
                        </button>
                    </div>

                    <div className='text-center'>
                        <Link to='/login' className={`text-gray-300 hover:text-white transition-colors ${isMobile ? 'text-sm' : 'text-sm'}`}>
                            Already have an account? <span className='font-semibold text-cyan-400 hover:text-cyan-300'>Sign In</span>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default SignUp