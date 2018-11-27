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
     * @returns record
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
                message: error,
            });
        }
    }

    /**
     * @class createIncident
     * @param {*} req
     * @param {*} res
     * @returns newRecord
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
                message: error,
            });
        }
    }
}

export default Incidents;
