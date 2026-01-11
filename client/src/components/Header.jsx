import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/authContext/UseAuth.jsx'
import { logo } from '../assets/assets.js'

const Header = () => {
    const navigate = useNavigate()
    const { currentUser } = useAuth()
    return (
        <>
            <div className="flex justify-between items-center shadow-6xl">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="w-16 h-16" />
                    <h1 className="text-xl tracking-normal font-bold text-black">Baraly Project Hub</h1>
                </div>
                {/* {
                    currentUser ?
                        <>
                            <button c className="bg-[#13BF9E] text-white px-4 py-2 rounded-full">Logout</button>
                        </>
                        :
                        <>
                            <button onClick={() => navigate('/auth/login')} className="bg-[#13BF9E] text-white px-4 py-2 rounded-full">Login</button>
                            <button onClick={() => navigate('/auth/signup')} className="bg-[#13BF9E] text-white px-4 py-2 rounded-full">Sign Up</button>
                        </>
                } */}
            </div>
        </>
    )
}

export default Header