// Controller class

import Model from '../model/model';

class Incidents {
    static async allIncidents(req, res) {
        try {
            const records = await Model.getAll();
            return res.status(200).send({
                status: 200,
                data: records,
            });
        } catch (error) {
            return res.status(404).send({ error });
        }
    }
}

export default Incidents;
