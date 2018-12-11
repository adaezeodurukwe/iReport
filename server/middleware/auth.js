// Authourization middleware

import * as Helper from '../controller/helper';

const Auth = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).send({ message: 'unauthorized' });
    }

    const unsigned = await Helper.verifyToken(token);

    req.userId = unsigned.userId;
    return next();
};

export default Auth;
