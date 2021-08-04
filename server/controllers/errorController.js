
//handle email or username duplicates
const handleDuplicateKeyError = (err, res) => {
    const field = Object.keys(err.keyValue);
    const code = 409;
    console.log( `An account with that ${field} already exists. fields:`, field );
    res.status(code).send({ error: `An account with that ${field} already exists.`, fields: field });
}

const handleValidationError = (err, res) => {
    let errors = Object.values(err.errors).map(el => el.message);
    let fields = Object.values(err.errors).map(el => el.path);
    let code = 400;
    if (errors.length > 1) {
        const formattedErrors = errors.join(' ');
        res.status(code).send({ error: formattedErrors, fields: fields });
    } else {
        res.status(code).send({ error: errors, fields: fields })
    }
}
module.exports = (err, res) => {
    try {
        console.log('congrats you hit the error middleware');
        if (err.name === 'ValidationError') return err = handleValidationError(err, res);
        if (err.code && err.code == 11000) return err = handleDuplicateKeyError(err, res);
    } catch (err) {
        res.status(500).json({error:'An unknown error occurred.'});
    }
}