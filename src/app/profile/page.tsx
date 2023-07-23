"use client"

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import toast from "react-hot-toast/headless"

export default function ProfilePage() {

    const router = useRouter()
    const handleLogout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout Successful')
            router.push('/login')
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    const getUser = async () => {
        const userData = await axios.get('/api/users/userInfo')
        console.log(userData.data.data);

    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className='m-8 text-4xl font-light'>Welcome!</h1>
            <div className='flex flex-col m-2'>
                <p className='text-xl'>This is my profile...</p>
            </div>
            <button type="submit"
                className='p-2 px-4 rounded-xl bg-btnColor-50
                text-white hover:bg-btnHover-50'
                onClick={handleLogout}
            >Logout</button>
        </div>
    )
}