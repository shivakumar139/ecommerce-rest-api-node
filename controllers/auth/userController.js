import { User } from "../../models";
import { CustomErrorHandler } from "../../services";

const userController = {

    async me(req, res, next){
        
        const {_id} = req.user;

        let user;
        try {
            user = await User.findById(_id).select("_id name email role");
            if(!user){
                next(CustomErrorHandler.notFound());
            }

        } catch (error) {
            next();
        }


        return res.json(user);
    }
}

export default userController;