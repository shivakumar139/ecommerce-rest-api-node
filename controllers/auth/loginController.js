import Joi from "joi";
import { User } from "../../models";
import { CustomErrorHandler, JwtService } from "../../services";
import bcrypt from "bcrypt";

const loginController = {
    async login(req, res, next){

        const loginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required()
        });

        try{
            await loginSchema.validateAsync(req.body);
        }catch(error){
            return next(error);
        }


        let accessToken;
        try {
            const isPresent = await User.findOne({email: req.body.email});

            if(!isPresent){
                return next(CustomErrorHandler.wrongCredentials("User is not Exists"));
            }

            // compare password
            const match = await bcrypt.compare(req.body.password, isPresent.password);
            if(!match){
                return next(CustomErrorHandler.wrongCredentials());
            }

            // access token

            accessToken = JwtService.sign({_id: isPresent._id, role: isPresent.role});
            
        } catch (error) {
            return next(error);
        }

        return res.json({access_token: accessToken});
    }
}

export default loginController;