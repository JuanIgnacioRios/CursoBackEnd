class CustomError {
    static createError({ name = "Error", cause, message, code = 1 }) {
        const error = new Error();
        error.name = name;
        error.message = message;
        error.cause = cause;
        error.code = code;
        throw error
    }
}

export default CustomError