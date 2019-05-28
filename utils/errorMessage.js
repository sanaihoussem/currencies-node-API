const errorMessage = (errorCode , errorMsg ) => {
    return {
        error: errorCode,
        message: errorMsg
    }
}

module.exports = errorMessage