// Routes

import express from 'express';
import User from '../controller/userController';
import Records from '../controller/redflagController';
import Auth from '../middleware/auth';
import * as Validate from '../middleware/validateInput';

const router = express.Router();


// Red flag routes
router.post(
    '/red-flags/',
    Validate.record,
    Validate.validationHandler,
    Auth,
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
    Records.getOneRedflag,
);

router.patch(
    '/red-flags/:id/location',
    Validate.updateLocation,
    Validate.validationHandler,
    Auth,
    Records.updateRedflagLocation,
);

router.patch(
    '/red-flags/:id/comment',
    Validate.updateComment,
    Validate.validationHandler,
    Auth,
    Records.updateRedflagComment,
);

router.delete(
    '/red-flags/:id',
    Auth,
    Records.deleteRedflag,
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
