//`use client` decorator to enable the page for client interaction (by default everything is on server) 

"use client"

import { useState } from 'react';

//new router in NextJs from next/navigation

import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function LoginPage() {

    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    //handle register button

    const onLogin = async () => {
        try {
            const response = await axios.post('/api/users/login', user)
            console.log("Login Success", response.data);
            toast.success('Login Success')
            router.push('/profile')
        } catch (error: any) {
            console.log("Login Failed!", error.message);
            toast.error(error.message)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className='m-8 text-4xl font-light'>Login your account</h1>
            <div className='flex flex-col m-2'>
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
                    onClick={onLogin}
                >Login</button>
            </div>
            <Link href="register" className='font-medium hover:text-blue-700'>Create an account</Link>
        </div>
    )
}