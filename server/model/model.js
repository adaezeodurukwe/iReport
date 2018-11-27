// Model class

import moment from 'moment';
import incidents from '../db/database';

/**
 * @class Model
 */
class Model {
    /**
     * @static gatAll
     * @returns {object}
     */
    static getAll() {
        return incidents;
    }

    /**
     * @static getOne
     * @param {*} id
     * @returns {object}
     */
    static getOne(id) {
        const incidentId = id;
        let record = false;
        incidents.forEach((incident) => {
            if (incident.id === incidentId) {
                record = incident;
            }
            return record;
        });
        return record;
    }

    /**
     * @async create
     * @param {*} author
     * @param {*} incidentType
     * @param {*} incidentLocation
     * @param {*} comments
     * @returns {object} incident
     */
    static create(author, incidentType, incidentLocation, comments) {
        const incidentId = incidents.length + 1;
        const newIncident = {
            id: incidentId,
            createdBy: author,
            createdOn: moment().format('DD/MM/YYYY'),
            type: incidentType,
            location: incidentLocation,
            status: 'draft',
            images: [],
            videos: [],
            comment: comments,
        };
        return incidents.push(newIncident);
    }

    /**
     * @static modifyLocation
     * @param {*} record
     * @param {*} newLocation
     * @returns {object} incident
     */
    static modifyLocation(record, newLocation) {
        const incident = record;
        const location = newLocation;

        incident.location = location;

        return incident;
    }

    /**
     * @static modifyComment
     * @param {*} record
     * @param {*} newComment
     * @returns {object} incident
     */
    static modifyComment(record, newComment) {
        const incident = record;
        const comment = newComment;

        incident.comment = comment;

        return incident;
    }
}

export default Model;
