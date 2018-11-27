// Routes

import express from 'express';
import Incidents from '../controller/controller';

const router = express.Router();

router.get('/', Incidents.allIncidents);
router.get('/:id', Incidents.oneIncident);

export default router;
