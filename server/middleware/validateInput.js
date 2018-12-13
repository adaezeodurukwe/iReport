// Validate middleware

import { body, param, validationResult } from 'express-validator/check';

// Validate signup input
const signUp = [
    body('firstname')
        .exists()
        .isLength({ min: 1 })
        .withMessage('firstname required')
        .isAlpha()
        .withMessage('firstname should contain only alphabets'),

    body('lastname')
        .exists()
        .isLength({ min: 1 })
        .withMessage('lastname required')
        .isAlpha()
        .withMessage('lastname should contain only alphabets'),

    body('username', 'username required').exists().isLength({ min: 1 }),

    body('email', 'enter valid email').exists().isEmail(),

    body('phone', 'enter valid phone number').isNumeric(),

    body('password', 'password should contain at least four characters').exists().isLength({ min: 4 }),

    body('isadmin', 'enter valid admin parameter').isIn([true, false]),


];

// Validate signin input
const signin = [
    body('email', 'Enter valid email').exists().isEmail(),

    body('password', 'Enter password').exists().isLength({ min: 1 }),
];

// Validate create record input
const redflagInput = [
    body('type', 'Record type is required').exists().isLength({ min: 1 }),

    body('type', 'Type must be \'red flag\'').equals('red flag'),

    body('location')
        .exists()
        .withMessage('Location is required')
        .isLatLong()
        .withMessage('Enter valid latitude and longitude format (lat,long)'),

    body('comment', 'Comment should contain up to 10 characters').exists().isLength({ min: 10 }),
];

const interventionInput = [
    body('type', 'Type is required').exists().isLength({ min: 1 }),

    body('type', 'Type must be \'intervention\'').equals('intervention'),

    body('location')
        .exists()
        .withMessage('Location is required')
        .isLatLong()
        .withMessage('Enter valid latitude and longitude format (lat,long)'),

    body('comment', 'Comment should contain up to 10 characters').exists().isLength({ min: 10 }),
];

// Validate param
const parameter = [
    param('id', 'Invalid id format').isUUID([4]),
];

// Validate update location input
const updateLocation = [
    body('location')
        .exists()
        .withMessage('Location is required')
        .isLatLong()
        .withMessage('Enter valid latitude and longitude format (lat,long)'),
];

// Validate update comment input
const updateComment = [
    body('comment', 'Comment should contain up to 10 characters').exists().isLength({ min: 10 }),
];

// Validate update status input
const updateStatus = [
    body('status', 'Invalid status').isIn(['under investigation', 'resolved', 'rejected']),
];

// Handle validation errors
const validationHandler = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            status: 422, message: errors.array()[0].msg,
        });
    }
    return next();
};


export {
    signUp,
    signin,
    redflagInput,
    interventionInput,
    updateLocation,
    updateComment,
    updateStatus,
    parameter,
    validationHandler,
};
