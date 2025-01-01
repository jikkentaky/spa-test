import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { User } from '@/types/user.type';

export async function getUser(): Promise<User | null> {
    const existCookie = (await cookies()).get('myapp')?.value;

    if (!process.env.JWT_SECRET) {
        throw new Error('JWT secret not set');
    }

    if (existCookie) {
        try {
            const decoded = jwt.verify(existCookie, process.env.JWT_SECRET) as User;

            return { userId: decoded.userId, email: decoded.email };
        } catch (e) {
            return null;
        }
    }

    return null;
}
