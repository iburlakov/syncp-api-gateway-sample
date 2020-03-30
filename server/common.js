function handleError(res, err) {
    res.status(500).send(err.message);
}

module.exports = {handleError};