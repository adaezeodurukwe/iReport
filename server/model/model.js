// Model class

import incidents from '../db/database';

class Model {
    static getAll() {
        return incidents;
    }
}

export default Model;
