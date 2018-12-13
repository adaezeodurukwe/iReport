// Routes

import express from 'express';
import User from '../controller/userController';
import Records from '../controller/recordsController';
import Auth from '../middleware/auth';
import * as Validate from '../middleware/validateInput';
import * as Message from '../middleware/message';
import isAdmin from '../middleware/adminAuth';

const router = express.Router();


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
    Auth,
    Validate.parameter,
    Message.redflag,
    Records.getOneRecord,
);

router.patch(
    '/red-flags/:id/location',
    Validate.updateLocation,
    Validate.validationHandler,
    Auth,
    Message.redflag,
    Records.updateRecordLocation,
);

router.patch(
    '/red-flags/:id/comment',
    Validate.updateComment,
    Validate.validationHandler,
    Auth,
    Message.redflag,
    Records.updateRecordComment,
);

router.patch(
    '/red-flags/:id/status',
    Validate.updateStatus,
    Validate.validationHandler,
    Auth,
    isAdmin,
    Message.redflag,
    Records.updateRecordStatus,
);

router.delete(
    '/red-flags/:id',
    Auth,
    Message.redflag,
    Records.deleteRecord,
);

// Intervention routes
router.post(
    '/intervention',
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
    Auth,
    Message.intervention,
    Records.getOneRecord,
);

router.patch(
    '/interventions/:id/location',
    Validate.updateLocation,
    Validate.validationHandler,
    Auth,
    Message.intervention,
    Records.updateRecordLocation,
);

router.patch(
    '/interventions/:id/comment',
    Validate.updateComment,
    Validate.validationHandler,
    Auth,
    Message.intervention,
    Records.updateRecordComment,
);

router.delete(
    '/interventions/:id',
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

export default router;
