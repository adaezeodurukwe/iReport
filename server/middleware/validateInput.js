// Validate middleware

import { body, param, validationResult } from 'express-validator/check';

// Validate signup input
const signUp = [
    body('firstname', 'Firstname required').exists(),

    body('lastname', 'lastname required').exists(),

    body('email', 'Enter valid email').exists().isEmail(),

    body('password', 'Password should contain at least four characters').exists().isLength({ min: 4 }),

];

// Validate signin input
const signin = [
    body('email', 'Enter valid email').exists().isEmail(),

    body('password', 'Enter password').exists(),
];

// Validate create record input
const redflagInput = [
    body('type', 'Type is required').exists(),

    body('type', 'Type must be \'red flag\'').equals('red flag'),

    body('location', 'Location is required').exists(),

    body('comment', 'Comment is required').exists().isLength({ min: 10 }),
];

const interventionInput = [
    body('type', 'Type is required').exists(),

    body('type', 'Type must be \'intervention\'').equals('intervention'),

    body('location', 'Location is required').exists(),

    body('comment', 'Comment is required').exists().isLength({ min: 10 }),
];

// Validate param
const parameter = [
    param('id', 'Invalid id').isUUID({ Version: 4 }),
];

// Validate update location input
const updateLocation = [
    body('location', 'Location is required').exists(),
];

// Validate update comment input
const updateComment = [
    body('comment', 'Comment is required').exists().isLength({ min: 10 }),
];


// Handle validation errors
const validationHandler = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array().map(error => error.msg) });
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
    parameter,
    validationHandler,
};
