import * as jwt from 'jwt-then';
import config from '../config/config';

const verifyToken = async (req, res, next): Promise<any> => {
    // check header or url parameters or post parameters for token
    if (!req.headers.authorization) {
        return res.status(403).send({success: false, message: 'Access denied.'});
    }
    const token: string = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(403).send({success: false, message: 'Access denied.'});
    }

    try {
        // verifies secret and checks exp
        const decoded = await jwt.verify(token, config.JWT_ENCRYPTION);
        req.email = decoded.email;
        next();
    } catch (err) {
        res.status(500).send({success: false, message: err});
    }
};

export default verifyToken;
