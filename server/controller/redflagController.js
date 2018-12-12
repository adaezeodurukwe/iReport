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
        const returnmessage = req.message;

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
                    message: `Created ${returnmessage} record`,
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
            const allRecords = await Model.getByType(req.userId, 'red flag');
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

    static async getAllInterventions(req, res) {
        try {
            const allRecords = await Model.getByType(req.userId, 'intervention');
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
    static async getOneRecord(req, res) {
        const returnmessage = req.message;
        try {
            const oneRedflag = await Model.getOne(req.userId, req.params.id, returnmessage);

            if (!oneRedflag) {
                return res.status(404).send({
                    status: 404,
                    message: `${returnmessage} not found`,
                });
            }

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
    static async updateRecordLocation(req, res) {
        const returnmessage = req.message;
        try {
            const updatedLocation = await Model.updateLocation(
                req.params.id,
                req.body.location,
                returnmessage,
            );

            if (!updatedLocation) {
                return res.status(404).send({
                    status: 404,
                    message: `${returnmessage} not found`,
                });
            }

            return res.status(200).send({
                status: 200,
                message: `Updated ${returnmessage} record's location`,
                data: updatedLocation,
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
            const updatedComment = await Model.updateComment(req.params.id, req.body.comment);

            if (!updatedComment) {
                return res.status(404).send({
                    status: 404,
                    message: 'Red-flag not found',
                });
            }

            return res.status(200).send({
                status: 200,
                message: 'Updated red-flag record\'s comment',
                data: updatedComment,
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

            if (!deleteRedflag) {
                return res.status(404).send({
                    status: 404,
                    message: 'Red-flag not found',
                });
            }

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
