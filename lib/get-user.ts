import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getUser() {
    const existCookie = (await cookies()).get('myapp')?.value;

    if (!process.env.JWT_SECRET) {
        throw new Error('JWT secret not set');
    }

    if (existCookie) {
        try {
            return jwt.verify(existCookie, process.env.JWT_SECRET);
        } catch (e) {
            return null;
        }
    }
}
