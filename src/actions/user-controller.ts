'use server';

import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { cookies} from "next/headers";
import jwt from "jsonwebtoken";
import {redirect} from "next/navigation";
import { getCollection } from '../../lib/db';

function generateToken(userId: string) {
    if (!process.env.JWT_SECRET) {
        throw new Error("Missing JWT_SECRET");
    }

    return jwt.sign(
        {
            skyColor: 'blue',
            userId: userId,
            exp: Math.floor(Date.now() / 1000) * 60 * 60 * 1000,
        },
        process.env.JWT_SECRET as string,
    );
}

async function setAuthCookie(token: string) {
    (await cookies()).set("myapp", token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000,
        secure: true
    });
}

export async function login(_previousState: null, formData: FormData) {
    const user = {
        email: formData.get("email") as string,
        password: formData.get('password') as string,
    };

    const usersCollection = await getCollection('users');
    const existUser = await usersCollection.findOne({ email: user.email });

    if (!existUser) {
        throw new Error("User does not exist");
    }

    const isPasswordValid = bcrypt.compareSync(user.password, existUser.password);

    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }

    const token = generateToken(existUser._id.toString());
    await setAuthCookie(token);

    redirect('/')
}

export async function logout() {
    (await cookies()).delete('myapp')

    redirect('/')
}

export async function register(_previousState: null, formData: FormData) {
    const newUser = {
        email: formData.get("email"),
        password: formData.get('password'),
    }

    if (typeof newUser.password !== 'string') {
        throw new Error("Password must be a string");
    }

    if (typeof newUser.email !== 'string') {
        throw new Error("Email must be a string");
    }

    try {
        const usersCollection = await getCollection('users');
        const existUser = await usersCollection.findOne({ email: newUser.email });

        if (existUser) {
            return "User already exists";
        }

        const salt = bcrypt.genSaltSync(10);
        newUser.password = bcrypt.hashSync(newUser.password, salt);

        const createdUser = await usersCollection.insertOne(newUser);
        const userId = createdUser.insertedId.toString();

        const token = generateToken(userId);
        await setAuthCookie(token);
    } catch (e) {
        console.error(e)

        return "be attention, An error occurred.";
    }

    revalidatePath("/");
}
