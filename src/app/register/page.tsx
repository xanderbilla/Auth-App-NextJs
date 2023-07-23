//`use client` decorator to enable the page for client interaction (by default everything is on server) 

"use client"

import { useState, useEffect } from 'react';

//new router in NextJs from next/navigation

import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

export default function SignUpPage() {

    const router = useRouter()

    const [btnDisable, setBtnDisable] = useState(false)
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    })

    //handle register button

    const onSignUp = async () => {
        try {
            const response = await axios.post('/api/users/signup', user)
            console.log("Registration Successful", response.data);
            router.push('/login')
        } catch (error: any) {
            console.log('Signup Failed', error.message);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className='m-8 text-4xl font-light'>Create an account</h1>
            <div className='flex flex-col m-2'>
                <input
                    className='p-2 border border-gray-300 rounded-lg 
                mb-4 focus:outline-none focus:border-gray-600'
                    type="text"
                    name="username"
                    id="username"
                    placeholder='Username'
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
                <input
                    className='p-2 border border-gray-300 rounded-lg 
                mb-4 focus:outline-none focus:border-gray-600'
                    type="email"
                    name="email"
                    id="email"
                    placeholder='Email Address'
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <input
                    className='p-2 border border-gray-300 rounded-lg 
                mb-4 focus:outline-none focus:border-gray-600'
                    type="password"
                    name="password"
                    id="password"
                    placeholder='Password'
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
                <button type="submit"
                    className='p-2 px-4 rounded-lg bg-btnColor-50
                text-white hover:bg-btnHover-50'
                    onClick={onSignUp}
                >Register</button>
            </div>
            <Link href="login" className='font-medium hover:text-blue-700'>Already an account? Login</Link>
        </div>
    )
}