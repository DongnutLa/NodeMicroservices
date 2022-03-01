exports.success = (req, res, message, status) => {
    let statusCode = status || 200;
    let statusMessage = message || '';
    
    res.status(statusCode).send({
        error: false,
        status: status,
        body: statusMessage
    })
}

exports.error = (req, res, message, status, error) => {
    let statusCode = status || 500;
    let statusMessage = message || '';
    if(error){
        console.log(error);
    }
    res.status(statusCode).send({
        error: false,
        status: status,
        body: statusMessage
    })
}