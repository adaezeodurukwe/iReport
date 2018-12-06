// User controller

import Model from '../model/userModel';
import * as Helper from './helper';


/**
 * @class User
 */
class User {
    /**
     * @async createUser
     * @param {*} req
     * @param {*} res
     * @returns {object}
     */
    static async createUser(req, res) {
        const password = Helper.encryptedPassword(req.body.password);
        try {
            const newUser = await Model.create(
                req.body.firstname,
                req.body.lasttname,
                req.body.othernames,
                req.body.email,
                password,
                req.body.phone,
            );
            const userToken = Helper.generateToken(newUser.id);
            return res.status(201).send({
                status: 201,
                data: [{
                    token: userToken,
                    user: newUser,
                }],
            });
        } catch (error) {
            return res.status(404).send({
                message: error,
            });
        }
    }
}

export default User;
