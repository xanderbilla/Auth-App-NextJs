import { connect } from "@/database/config";
import { getTokenData } from "@/helpers/getTokenData";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export const GET = async (request:NextRequest) => {
    try {
        const user = await getTokenData(request)        
        await User.findOne({_id: user.id})
        return NextResponse.json({
            message: "User found", 
            data: user
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {
            status: 500
        })
    }
}