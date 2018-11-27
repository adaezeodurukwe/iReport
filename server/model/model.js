// Model class

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
     * @returns {object}
     */
    static getOne(id) {
        const incidentId = id;
        let record;
        incidents.forEach((incident) => {
            record = incident.id === incidentId ? incident : false;
        });
        return record;
    }
}

export default Model;
