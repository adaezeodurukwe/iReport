// Middle ware to differentiate between a redflag and intervention

const intervention = (req, res, next) => {
    req.message = 'intervention';
    return next();
};

const redflag = (req, res, next) => {
    req.message = 'red-flag';
    return next();
};

export { redflag, intervention };
