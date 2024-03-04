import React, { useContext } from 'react'
import { UserContext } from '../App'
import { useNavigate } from 'react-router-dom'

const ProfilePage = () => {
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()


    const logout = () => {
        localStorage.clear();
        setUser()
        navigate('/login')
    }
    return (
        <div className="flex items-center flex-col mt-16">
            <p className="font-semibold">Logged in as {user.name} ({user.email})</p>
            <button className="mt-2 primary max-w-sm" onClick={logout}>Logout</button>
        </div>
    )
}

export default ProfilePage