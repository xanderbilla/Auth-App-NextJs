"use client"

import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function VerifyEmail() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', { token })
            setVerified(true)
        } catch (error: any) {
            setError(true)
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "")
    }, [])

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail()
        }
    }, [token])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className='m-8 text-4xl font-light'>
                Verify Your Email
            </h1>
            <div className='flex flex-col m-2'>
                <p className='text-xl'>{token ? `Token Found: ${token}` : "Token not found!"}</p>
                {
                    verified && 
                    <div className="text-2xl">Email Verified
                    <Link href="/login" className='text-blue-500'>Login</Link>
                    </div>
                }
                {
                    error && 
                    <div className="text-2xl">Invalid Token!!!
                    </div>
                }
            </div>
        </div>
    )
}