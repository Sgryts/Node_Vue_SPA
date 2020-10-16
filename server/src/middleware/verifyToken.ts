import * as jwt from 'jsonwebtoken';
import config from '../config/config';

const verifyToken = async (req, res, next): Promise<any> => {
    if (!req.headers.authorization) {
        return res.status(401).send({ success: false, message: 'Access denied.' });
    }
    const token: string = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).send({ success: false, message: 'Access denied.' });
    }

    try {
        const decoded = await jwt.verify(token, config.JWT_ENCRYPTION);
        req.email = decoded.email;
        next();
    } catch (err) {
        if (JSON.stringify(err).toLowerCase().includes('expired')) {
            res.status(403).send({ success: false, message: 'Access denied.' });
        } else {
            res.status(401).send({ success: false, message: 'Access denied.-2' });
        }
    }
};

export default verifyToken;
