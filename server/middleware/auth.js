// Authourization middleware

import * as Helper from '../controller/helper';

const Auth = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    try {
        if (!token) {
            return res.status(401).send({
                status: 401,
                message: 'unauthorized',
            });
        }
        const unsigned = await Helper.verifyToken(token);

        req.userId = unsigned.userId;
        req.isAdmin = unsigned.isAdmin;

        return next();
    } catch (error) {
        return res.status(401).send({
            status: 401,
            message: error.message,
        });
    }
};

export default Auth;
