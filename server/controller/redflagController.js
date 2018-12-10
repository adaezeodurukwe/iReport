// Records controller

import Model from '../model/recordsModel';

class Records {
    /**
     * @async createRecord
     * @param {*} req
     * @param {*} res
     * @returns {object}
     */
    static async createRecord(req, res) {
        try {
            const newRecord = await Model.create(
                req.userId,
                req.body.type,
                req.body.location,
                req.body.images,
                req.body.videos,
                req.body.comment,
            );
            return res.status(201).send({
                status: 201,
                data: [{
                    id: newRecord.id,
                    message: 'Created red-flag record',
                    record: newRecord,
                },
                ],
            });
        } catch (error) {
            return res.status(500).send({
                message: error,
            });
        }
    }

    /**
     * @async getAllRedflags
     * @param {*} req
     * @param {*} res
     * @returns {object}
     */
    static async getAllRedflags(req, res) {
        try {
            const allRecords = await Model.getAll(req.userId);
            return res.status(200).send({
                status: 200,
                data: allRecords,
            });
        } catch (error) {
            return res.status(500).send({
                message: error,
            });
        }
    }

    /**
     * @async
     * @param {*} req
     * @param {*} res
     * @returns {object}
     */
    static async getOneRedflag(req, res) {
        try {
            const oneRedflag = await Model.getOne(req.userId, req.params.id);
            return res.status(200).send({
                status: 200,
                data: oneRedflag,
            });
        } catch (error) {
            return res.status(500).send({
                message: error,
            });
        }
    }

    /**
     * @async updateRedflagLocation
     * @param {*} req
     * @param {*} res
     * @returns {object}
     */
    static async updateRedflagLocation(req, res) {
        try {
            const updateLocation = await Model.updateLocation(req.params.id, req.body.location);
            return res.status(200).send({
                status: 200,
                message: 'Updated red-flag record\'s location',
                data: updateLocation,
            });
        } catch (error) {
            return res.status(500).send({
                message: error,
            });
        }
    }

    /**
     * @async updateRedflagComment
     * @param {*} req
     * @param {*} res
     * @returns {object}
     */
    static async updateRedflagComment(req, res) {
        try {
            const updateComment = await Model.updateComment(req.params.id, req.body.comment);
            return res.status(200).send({
                status: 200,
                message: 'Updated red-flag record\'s comment',
                data: updateComment,
            });
        } catch (error) {
            return res.status(500).send({
                message: error,
            });
        }
    }

    /**
     * @async deleteRedflag
     * @param {*} req
     * @param {*} res
     * @returns {object}
     */
    static async deleteRedflag(req, res) {
        try {
            const deleteRedflag = await Model.delete(req.userId, req.params.id);
            return res.status(200).send({
                status: 200,
                message: 'red-flag record has been deleted',
                data: deleteRedflag,
            });
        } catch (error) {
            return res.status(500).send({
                message: error,
            });
        }
    }
}
export default Records;
