class CustomErrorHandler extends Error{
    constructor(status, msg){
        super();
        this.statusCode = status;
        this.message = msg;
    }


    static emailAlreadyExists(message){
        return new CustomErrorHandler(409, message);
    }

    static wrongCredentials(message = "Password is wrong"){
        return new CustomErrorHandler(401, message);
    }
    static noAuthorised(message = "UnAuthorized Access"){
        return new CustomErrorHandler(401, message);
    }

    static notFound(message = "User Not Found."){
        return new CustomErrorHandler(404, message);
    }

    static invalidRefreshToken(message = "Invalid refresh token."){
        return new CustomErrorHandler(404, message);
    }

    static serverError(message = "Internal Server error"){
        return new CustomErrorHandler(500, message);
    }

    static invalidProductId(message = "Invalid product id"){
        return new CustomErrorHandler(404, message);
    }
}

export default CustomErrorHandler;