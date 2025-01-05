import { SignJWT, jwtVerify } from 'jose';
import { Document, WithId } from 'mongodb';

export const serializeDocument = <T extends Document>(doc: WithId<T>) => {
    const { _id, ...rest } = doc;

    return {
        ...rest,
        _id: _id.toString()
    };
};

export async function generateToken(userId: string, email: string): Promise<string> {
    if (!process.env.JWT_SECRET) {
        throw new Error('Missing JWT_SECRET');
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    return await new SignJWT({ userId, email })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('1h')
        .sign(secret);
}

export const getFormattedDate = (dateInput: string | Date, locale: string) => {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

    if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
    }

    const day = date.getDate().toString().padStart(2, '0');
    const month = date
        .toLocaleString(`${locale.toLowerCase()}-${locale.toUpperCase()}`, { month: 'short' })
        .toLowerCase();
    const year = date.getFullYear();

    return `${day} / ${month} / ${year}`;
};

export const isTokenValid = async (token: string | undefined): Promise<boolean> => {
    if (!token || !process.env.JWT_SECRET) return false;

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token, secret, {
            algorithms: ['HS256']
        });

        return !!payload;
    } catch (error) {
        console.error(error);

        return false;
    }
};
