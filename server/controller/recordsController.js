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
     * @async getAllRecords
     * @param {*} req
     * @param {*} res
     * @returns {object}
     */
    static async getAllRecords(req, res) {
        try {
            const allRecords = await Model.getAll();
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

    /**
     * @static
     * @param {*} req
     * @param {*} res
     * @returns {object}
     */
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
            const oneRedflag = await Model.getOne(req.params.id, returnmessage);

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

    static async addImage(req, res) {
        const returnmessage = req.message;
        const id = req.userId;
        const recordId = req.params.id;
        const newImage = req.body.image;
        try {
            const getRecord = await Model.getOne(id, recordId, returnmessage);

            if (!getRecord) {
                return res.status(404).send({
                    status: 404,
                    message: `${returnmessage} not found`,
                });
            }
            const updatedRecord = await Model.updateImage(
                recordId,
                newImage,
                returnmessage,
            );

            return res.status(200).send({
                status: 200,
                message: `Image added to ${returnmessage} record`,
                data: updatedRecord,
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
        const id = req.userId;
        const recordId = req.params.id;
        const newLocation = req.body.location;
        try {
            const getRecord = await Model.getOne(id, recordId, returnmessage);

            if (!getRecord) {
                return res.status(404).send({
                    status: 404,
                    message: `${returnmessage} not found`,
                });
            }

            const updatedLocation = await Model.updateLocation(
                recordId,
                newLocation,
                returnmessage,
            );

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
    static async updateRecordComment(req, res) {
        const returnmessage = req.message;
        const id = req.userId;
        const recordId = req.params.id;
        const newComment = req.body.comment;
        try {
            const getRecord = await Model.getOne(id, recordId, returnmessage);

            if (!getRecord) {
                return res.status(404).send({
                    status: 404,
                    message: `${returnmessage} not found`,
                });
            }

            const updatedComment = await Model.updateComment(
                recordId,
                newComment,
                returnmessage,
            );

            if (!updatedComment) {
                return res.status(404).send({
                    status: 404,
                    message: `${returnmessage} not found`,
                });
            }

            return res.status(200).send({
                status: 200,
                message: `Updated ${returnmessage} record's comment`,
                data: updatedComment,
            });
        } catch (error) {
            return res.status(500).send({
                message: error,
            });
        }
    }

    /**
     * @async updateRecordStatus
     * @param {*} req
     * @param {*} res
     * @returns {object}
     */
    static async updateRecordStatus(req, res) {
        const returnmessage = req.message;
        const adminStatus = req.isAdmin;
        try {
            if (!adminStatus || adminStatus === false) {
                return res.status(403).send({
                    status: 403,
                    message: 'forbidden',
                });
            }

            const updatedStatus = await Model.updateStatus(
                req.params.id,
                req.body.status,
                returnmessage,
            );

            if (!updatedStatus) {
                return res.status(404).send({
                    status: 404,
                    message: `${returnmessage} not found`,
                });
            }

            return res.status(200).send({
                status: 200,
                message: `Updated ${returnmessage} record's status`,
                data: updatedStatus,
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
    static async deleteRecord(req, res) {
        const returnmessage = req.message;
        const id = req.userId;
        const recordId = req.params.id;
        try {
            const getRecord = await Model.getOne(id, recordId, returnmessage);

            if (!getRecord) {
                return res.status(404).send({
                    status: 404,
                    message: `${returnmessage} not found`,
                });
            }

            const deleteRedflag = await Model.delete(id, recordId, returnmessage);

            if (!deleteRedflag) {
                return res.status(404).send({
                    status: 404,
                    message: `${returnmessage} not found`,
                });
            }

            return res.status(200).send({
                status: 200,
                message: `${returnmessage} record has been deleted`,
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
