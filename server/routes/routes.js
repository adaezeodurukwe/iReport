// Routes

import express from 'express';
import User from '../controller/userController';
import Records from '../controller/recordsController';
import Auth from '../middleware/auth';
import * as Validate from '../middleware/validateInput';
import * as Message from '../middleware/message';

const router = express.Router();

// Get all records
router.get(
    '/records/',
    Records.getAllRecords,
);

// Red flag routes
router.post(
    '/red-flags/',
    Validate.redflagInput,
    Validate.validationHandler,
    Auth,
    Message.redflag,
    Records.createRecord,
);

router.get(
    '/red-flags/',
    Auth,
    Records.getAllRedflags,
);

router.get(
    '/red-flags/:id',
    Validate.parameter,
    Validate.validationHandler,
    Message.redflag,
    Records.getOneRecord,
);

router.patch(
    '/red-flags/:id/location',
    Validate.parameter,
    Validate.updateLocation,
    Validate.validationHandler,
    Auth,
    Message.redflag,
    Records.updateRecordLocation,
);

router.patch(
    '/red-flags/:id/comment',
    Validate.parameter,
    Validate.updateComment,
    Validate.validationHandler,
    Auth,
    Message.redflag,
    Records.updateRecordComment,
);

router.patch(
    '/red-flags/:id/status',
    Validate.parameter,
    Validate.updateStatus,
    Validate.validationHandler,
    Auth,
    Message.redflag,
    Records.updateRecordStatus,
);

router.patch(
    '/red-flags/:id/addImage',
    Validate.parameter,
    Validate.validationHandler,
    Auth,
    Message.redflag,
    Records.addImage,
);

router.delete(
    '/red-flags/:id',
    Validate.parameter,
    Validate.validationHandler,
    Auth,
    Message.redflag,
    Records.deleteRecord,
);

// Intervention routes
router.post(
    '/interventions',
    Validate.interventionInput,
    Validate.validationHandler,
    Auth,
    Message.intervention,
    Records.createRecord,
);

router.get(
    '/interventions',
    Auth,
    Records.getAllInterventions,
);

router.get(
    '/interventions/:id',
    Validate.parameter,
    Validate.updateLocation,
    Message.intervention,
    Records.getOneRecord,
);

router.patch(
    '/interventions/:id/location',
    Validate.parameter,
    Validate.updateLocation,
    Validate.validationHandler,
    Auth,
    Message.intervention,
    Records.updateRecordLocation,
);

router.patch(
    '/interventions/:id/comment',
    Validate.parameter,
    Validate.updateComment,
    Validate.validationHandler,
    Auth,
    Message.intervention,
    Records.updateRecordComment,
);

router.patch(
    '/interventions/:id/status',
    Validate.parameter,
    Validate.updateStatus,
    Validate.validationHandler,
    Auth,
    Message.intervention,
    Records.updateRecordStatus,
);

router.patch(
    '/interventions/:id/addImage',
    Validate.parameter,
    Validate.validationHandler,
    Auth,
    Message.intervention,
    Records.addImage,
);


router.delete(
    '/interventions/:id',
    Validate.parameter,
    Validate.validationHandler,
    Auth,
    Message.intervention,
    Records.deleteRecord,
);

// User routes
router.post(
    '/auth/signup',
    Validate.signUp,
    Validate.validationHandler,
    User.createUser,
);

router.post(
    '/auth/signin',
    Validate.signin,
    Validate.validationHandler,
    User.login,
);

router.get('/auth/user', Auth, User.getUser);

// Throw error for all unavailable routes
router.all('*', (req, res) => res.status(404).send({
    status: 404,
    message: 'Route not found',
}));

export default router;
