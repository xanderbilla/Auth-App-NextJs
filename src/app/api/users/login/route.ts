import { connect } from "@/database/config";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import jwt from 'jsonwebtoken'

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody;
        console.log(reqBody);

        //check if user exist

        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({ error: "User doesn't exist" },
                { status: 400 })
        }

        //check if password is correct

        const validPass = await bcryptjs.compare(password, user.password)
        if (!validPass) {
            return NextResponse.json({ error: "User doesn't exist" },
                { status: 400 })
        }

        //create token data

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        //create token data

        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY!,
            { expiresIn: "1d" })

        const response = NextResponse.json({
            message: "Login Successful",
            success: true,
        })

        response.cookies.set("token", token, {
            httpOnly: true
        })
        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}