import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
  const [loading, setLoading ] = useState(false);
  const {authUser, setAuthUser} = useAuthContext();

  const signup = async ({fullName, username, password, confirmPassword, gender, about}) => {
    const success = handleInputError({fullName, username, password, confirmPassword, gender});
    if(!success) return;

    setLoading(true);

    try{
        const res = await fetch("/api/auth/signup",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({fullName, username, password, confirmPassword, gender, about})
        })

        const data = await res.json();
        if(data.error){
            throw new Error(data.error)
        }
        
        localStorage.setItem("chat-user", JSON.stringify(data))
        setAuthUser(data);
        toast.success("Account created successfully!");

    } catch(error) {
        toast.error(error.message || "An error occurred while signing up.")
    } finally {
        setLoading(false);
    }
  };
  return { loading, signup};

};

export default useSignup


function handleInputError({fullName, username, password, confirmPassword, gender}){
    if(!fullName || !username || !password || !confirmPassword || !gender){
        toast.error("Please fill all fields.")
        return false;
    }

    if(password !== confirmPassword){
        toast.error("Passwords do not match.")
        return false;
    }

    if(password.length < 6){
        toast.error("Password must be at least 6 characters long.")
        return false;
    }

    return true;
}