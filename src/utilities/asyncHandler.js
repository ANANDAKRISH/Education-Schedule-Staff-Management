const asyncHandler = (reqHandler) => {
    return (req, res, next) => {
        Promise.resolve(reqHandler(req, res, next)).
        catch((err) => next(err))
    }
}

export {asyncHandler}

// We need to define a global error middleware
// error handler