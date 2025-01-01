import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { User } from '@/types/types';
import bcrypt from "bcrypt";

export const generateToken = (userId: string, email: string) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("Missing JWT_SECRET");
    }

    return jwt.sign(
        {
            email,
            userId: userId,
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        process.env.JWT_SECRET
    );
}

export const setAuthCookie = async  (token: string)=> {
    (await cookies()).set("myapp", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 60 * 1000,
        secure: true,
    });
}

export const hashPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
}

export const verifyPassword = (inputPassword: string, hashedPassword: string) => {
    return bcrypt.compareSync(inputPassword, hashedPassword);
}

export const getUser = async () => {
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
