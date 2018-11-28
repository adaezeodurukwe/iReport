// Controller class

import Model from '../model/model';

/**
 * @class Incidents
 */
class Incidents {
    /**
     * @async allIncidents
     * @param {*} req
     * @param {*} res
     * @returns {object} records
     */
    static async allIncidents(req, res) {
        try {
            const records = await Model.getAll();
            return res.status(200).send({
                status: 200,
                data: records,
            });
        } catch (error) {
            return res.status(404).send({
                status: 404,
                message: error,
            });
        }
    }

    /**
     * @async oneIncident
     * @param {*} req
     * @param {*} res
     * @returns {object} record
     */
    static async oneIncident(req, res) {
        const id = parseInt(req.params.id, 10);
        try {
            const record = await Model.getOne(id);
            if (record === false) {
                return res.status(404).send({
                    status: 404,
                    data: 'Not found',
                });
            }
            return res.status(200).send({
                status: 200,
                data: record,
            });
        } catch (error) {
            return res.status(404).send({
                status: 404,
                message: error,
            });
        }
    }

    /**
     * @class createIncident
     * @param {*} req
     * @param {*} res
     * @returns {object} newRecord
     */
    static async createIncident(req, res) {
        try {
            const newRecord = await Model.create(
                req.body.author,
                req.body.type,
                req.body.location,
                req.body.comment,
            );
            return res.status(201).send({
                status: 201,
                data: [{
                    id: newRecord,
                    message: 'Created red-flag record',
                }],
            });
        } catch (error) {
            return res.status(400).send({
                status: 404,
                message: error,
            });
        }
    }

    /**
     * @async modifyIncidentLocation
     * @param {*} req
     * @param {*} res
     * @returns {object} modifiedRecord
     */
    static async modifyIncidentLocation(req, res) {
        const id = parseInt(req.params.id, 10);
        try {
            const record = await Model.getOne(id);
            if (record === false) {
                return res.status(404).send({
                    status: 404,
                    message: 'Red-flag not found',
                });
            }
            const modifiedRecord = await Model.modifyLocation(record, req.body.location);
            return res.status(200).send({
                status: 200,
                data: [{
                    id: modifiedRecord.id,
                    message: 'updated red-flag record\'s location',
                }],
            });
        } catch (error) {
            return res.status(404).send({
                status: 404,
                message: error,
            });
        }
    }

    /**
     * @async modifyIncidentComment
     * @param {*} req
     * @param {*} res
     * @returns {object} modifiedRecord
     */
    static async modifyIncidentComment(req, res) {
        const id = parseInt(req.params.id, 10);
        try {
            const record = await Model.getOne(id);
            if (record === false) {
                return res.status(404).send({
                    status: 404,
                    message: 'Red-flag not found',
                });
            }
            const modifiedRecord = await Model.modifyComment(record, req.body.comment);
            return res.status(200).send({
                status: 200,
                data: [{
                    id: modifiedRecord.id,
                    message: 'updated red-flag record\'s comment',
                }],
            });
        } catch (error) {
            return res.status(404).send({
                status: 404,
                message: error,
            });
        }
    }

    static async deleteIncident(req, res) {
        const id = parseInt(req.params.id, 10);
        try {
            const record = await Model.getOne(id);
            if (record === false) {
                return res.status(404).send({
                    status: 404,
                    message: 'Red-flag not found',
                });
            }
            const deletedRecord = await Model.delete(record);
            return res.status(200).send({
                status: 200,
                data: [{
                    id: deletedRecord.id,
                    message: 'red-flag record has been deleted',
                }],
            });
        } catch (error) {
            return res.status(404).send({
                status: 404,
                message: error,
            });
        }
    }
}

export default Incidents;
