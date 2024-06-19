import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY || 'myNewKey';

export const generateToken = (payload: object): string => {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

export const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null;
    }
};
