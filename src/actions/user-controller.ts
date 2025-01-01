'use server';

import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { cookies} from "next/headers";
import jwt from "jsonwebtoken";
import {redirect} from "next/navigation";
import { getCollection } from '@/libs/db';

import { z } from "zod";

const errorMessages = {
    invalidEmail: "invalidEmail",
    invalidPassword: "invalidPassword",
    userNotFound: "userNotFound",
    userExists: "userExists",
    passwordTooShort: "passwordTooShort",
    passwordTooSimple: "passwordTooSimple",
    serverError: "serverError",
};

const userSchema = z.object({
    email: z.string().email(errorMessages.invalidEmail),
    password: z
        .string()
        .min(8, errorMessages.passwordTooShort)
        .regex(/[A-Z]/, errorMessages.passwordTooSimple)
        .regex(/[a-z]/, errorMessages.passwordTooSimple)
        .regex(/[0-9]/, errorMessages.passwordTooSimple)
        .regex(/[\W_]/, errorMessages.passwordTooSimple),
});

function generateToken(userId: string, email: string,) {
    if (!process.env.JWT_SECRET) {
        throw new Error("Missing JWT_SECRET");
    }

    return jwt.sign(
        {
            email,
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

export async function login(
    _previousState: string | null | undefined,
    formData: FormData
): Promise<string | null | undefined> {
    try {
        const user = userSchema.parse({
            email: formData.get("email"),
            password: formData.get("password"),
        });

        const usersCollection = await getCollection("users");
        const existUser = await usersCollection.findOne({ email: user.email });

        if (!existUser) {
            return errorMessages.userNotFound;
        }

        const isPasswordValid = bcrypt.compareSync(user.password, existUser.password);
        if (!isPasswordValid) {
            return errorMessages.invalidPassword;
        }

        const token = generateToken(existUser._id.toString(), existUser.email);
        await setAuthCookie(token);

        revalidatePath("/");
    } catch (e) {
        if (e instanceof z.ZodError) {
            return e.errors[0].message;
        }

        return errorMessages.serverError;
    }
}

export async function logout() {
    (await cookies()).delete('myapp')

    redirect('/')
}

export async function signUp(
    _previousState: string | null | undefined,
    formData: FormData
): Promise<string | null | undefined> {
    try {
        const newUser = userSchema.parse({
            email: formData.get("email"),
            password: formData.get("password"),
        });

        const usersCollection = await getCollection("users");
        const existUser = await usersCollection.findOne({ email: newUser.email });

        if (existUser) {
            return errorMessages.userExists; // Локализованный ключ
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(newUser.password, salt);

        const createdUser = await usersCollection.insertOne({
            email: newUser.email,
            password: hashedPassword,
        });

        const userId = createdUser.insertedId.toString();
        const token = generateToken(userId, newUser.email);
        await setAuthCookie(token);

        revalidatePath("/");
    } catch (e) {
        if (e instanceof z.ZodError) {
            return e.errors[0].message;
        }

        return errorMessages.serverError;
    }
}
