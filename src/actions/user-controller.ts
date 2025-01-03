'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { generateToken } from '@/helpers';
import { getCollection } from '@/libs/db/db';

import bcrypt from 'bcryptjs';
import { jwtVerify } from 'jose';
import { z } from 'zod';

const errorMessages = {
    invalidEmail: 'invalidEmail',
    invalidPassword: 'invalidPassword',
    userNotFound: 'userNotFound',
    userExists: 'userExists',
    passwordTooShort: 'passwordTooShort',
    passwordTooSimple: 'passwordTooSimple',
    serverError: 'serverError'
};

const setAuthCookie = async (token: string) => {
    (await cookies()).set('myapp', token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 60 * 1000,
        secure: true
    });
};

const userSchema = z.object({
    email: z.string().email(errorMessages.invalidEmail),
    password: z
        .string()
        .min(8, errorMessages.passwordTooShort)
        .regex(/[A-Z]/, errorMessages.passwordTooSimple)
        .regex(/[a-z]/, errorMessages.passwordTooSimple)
        .regex(/[0-9]/, errorMessages.passwordTooSimple)
        .regex(/[\W_]/, errorMessages.passwordTooSimple)
});

export const login = async (_previousState: string | null | undefined, formData: FormData) => {
    try {
        const user = userSchema.parse({
            email: formData.get('email'),
            password: formData.get('password')
        });

        const usersCollection = await getCollection('users');
        const existUser = await usersCollection.findOne({ email: user.email });

        if (!existUser) {
            return errorMessages.userNotFound;
        }

        const isPasswordValid = bcrypt.compareSync(user.password, existUser.password);
        if (!isPasswordValid) {
            return errorMessages.invalidPassword;
        }

        const token = await generateToken(existUser._id.toString(), existUser.email);
        await setAuthCookie(token);

        revalidatePath('/');
    } catch (e) {
        if (e instanceof z.ZodError) {
            return e.errors[0].message;
        }

        return errorMessages.serverError;
    }
};

export const logout = async (locale: string) => {
    (await cookies()).delete('myapp');

    redirect(`/${locale.toLowerCase()}/login`);
};

export const signUp = async (_previousState: string | null | undefined, formData: FormData) => {
    try {
        const newUser = userSchema.parse({
            email: formData.get('email'),
            password: formData.get('password')
        });

        const usersCollection = await getCollection('users');
        const existUser = await usersCollection.findOne({ email: newUser.email });

        if (existUser) {
            return errorMessages.userExists;
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(newUser.password, salt);

        const createdUser = await usersCollection.insertOne({
            email: newUser.email,
            password: hashedPassword
        });

        const userId = createdUser.insertedId.toString();
        const token = await generateToken(userId, newUser.email);
        await setAuthCookie(token);

        revalidatePath('/');
    } catch (e) {
        if (e instanceof z.ZodError) {
            return e.errors[0].message;
        }

        return errorMessages.serverError;
    }
};

export const getUser = async () => {
    const existCookie = (await cookies()).get('myapp')?.value;

    if (!process.env.JWT_SECRET) {
        throw new Error('JWT secret not set');
    }

    if (existCookie) {
        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            const { payload } = await jwtVerify(existCookie, secret, {
                algorithms: ['HS256']
            });

            return {
                userId: payload.userId as string,
                email: payload.email as string
            };
        } catch (e) {
            return null;
        }
    }

    return null;
};
