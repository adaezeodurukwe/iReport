// Routes

import express from 'express';
import Incidents from '../controller/controller';
import User from '../controller/userController';

const router = express.Router();

router.get('/red-flags/', Incidents.allIncidents);
router.get('/red-flags/:id', Incidents.oneIncident);
router.post('/red-flags/', Incidents.createIncident);
router.patch('/red-flags/:id/location', Incidents.modifyIncidentLocation);
router.patch('/red-flags/:id/comment', Incidents.modifyIncidentComment);
router.delete('/red-flags/:id', Incidents.deleteIncident);

// User routes
router.post('/auth/signup', User.createUser);

export default router;
