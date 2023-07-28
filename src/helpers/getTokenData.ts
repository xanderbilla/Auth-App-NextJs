import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'

export const getTokenData = (request: NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value || '';
        const info: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
        return info
    } catch (error:any) {
        throw new Error(error.message)
    }
} 