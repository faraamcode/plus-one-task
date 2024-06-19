import { IRes } from '@src/routes/types/express/misc';
import { IReq } from '@src/routes/types/types';
import { verifyToken } from '@src/util/jwt';
import { NextFunction } from 'express';
import jwt from 'jsonwebtoken';


const verifyAuthToken = (req: IReq, res: IRes, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header is missing' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }

    try {
        const decoded = verifyToken(token)
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export default verifyAuthToken;
