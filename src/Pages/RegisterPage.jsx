import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const RegisterPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const register = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/register', {
            name, email, password
        })
    }
    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-12'>
                <h1 className='text-4xl text-center mb-4 font-semibold'>Register</h1>
                <form className='max-w-md mx-auto' onSubmit={register}>
                    <input type="text" placeholder='John Doe' value={name} onChange={e => setName(e.target.value)} />
                    <input type="email" placeholder='your@email.com' value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder='password' value={password} onChange={e => setPassword(e.target.value)} />
                    <button className='primary'>Register</button>
                    <div className='text-center text-gray-500 py-2'>Already a member? <Link to={'/login'} className='underline text-black'>Login</Link></div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage