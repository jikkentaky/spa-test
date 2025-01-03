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

    return date
        .toLocaleDateString(`${locale.toLowerCase()}-${locale.toUpperCase()}`, {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        })
        .replace(/(\d+)\.(\s*)(\w+)\.(\s*)(\d+)/, '$1 / $3 / $5');
};

export async function isTokenValid(token: string | undefined): Promise<boolean> {
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
}
