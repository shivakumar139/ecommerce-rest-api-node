import {User} from "../models"
import { CustomErrorHandler } from "../services";

const admin = async (req, res, next) =>{
    try {
        const user = await User.findById(req.user._id);

        if(user.role === "admin"){
            next()
        } else{
            return next(CustomErrorHandler.noAuthorised())
        }
    } catch (error) {
        return next(CustomErrorHandler.serverError(error.message))
    }
}

export default admin;