// Admin validation

const isAdmin = (req, res, next) => {
    const adminStatus = req.isAdmin;
    if (!adminStatus || adminStatus === false) {
        return res.status(403).send({ message: 'forbidden' });
    }
    return next();
};

export default isAdmin;
