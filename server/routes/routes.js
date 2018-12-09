// Routes

import express from 'express';
// import Incidents from '../controller/controller';
import User from '../controller/userController';
import Records from '../controller/redflagController';
import Auth from '../middleware/auth';

const router = express.Router();

router.post('/red-flags/', Auth, Records.createRecord);
router.get('/red-flags/', Auth, Records.getAllRedflags);
router.get('/red-flags/:id', Auth, Records.getOneRedflag);
router.patch('/red-flags/:id/location', Auth, Records.updateRedflagLocation);
router.patch('/red-flags/:id/comment', Auth, Records.updateRedflagComment);
router.delete('/red-flags/:id', Auth, Records.deleteRedflag);

// User routes
router.post('/auth/signup', User.createUser);
router.post('/auth/signin', User.login);

export default router;
