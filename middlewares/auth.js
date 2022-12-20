import { CustomErrorHandler, JwtService } from "../services";

const auth = async (req, res, next) => {
    
    const headerAuth = req.headers.authorization;
    if(!headerAuth){
        next(CustomErrorHandler.noAuthorised());
    }

    const token = headerAuth.split(" ")[1];

    try {
        const {_id, role} = await JwtService.verify(token);

        const user = {
            _id,
            role
        }

        req.user = user;
    
        next();

    } catch (error) {
        next(CustomErrorHandler.noAuthorised());
    }
    
}

export default auth;