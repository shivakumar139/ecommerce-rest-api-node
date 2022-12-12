import Joi from "joi";
import {User} from "../../models";
import bcrypt from "bcrypt";
import { CustomErrorHandler, JwtService } from "../../services";


const registerController = {

    async register(req, res, next){


        // validation using Joi library
        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
            repeat_password: Joi.ref("password")
        })


        try{
            await registerSchema.validateAsync(req.body);
        }catch(error){
            return next(error);
        }
        


        // check if user is already present in the database
        try{
            const exists = await User.exists({email: req.body.email});
            if(exists){
                return next(CustomErrorHandler.emailAlreadyExists("Email is Already Exists."));
            }

        }catch(error){
            return next(error);
        }
        

        // hash password
        const hashedPassword = await bcrypt.hash(req.body.password,10);

        // prepare the model
        const {name, email} = req.body;
        const user = new User({
            name,
            email,
            password: hashedPassword
        });


        let accessToken;
        try {
            const result = await user.save();

            // token
            accessToken = JwtService.sign({_id: result._id, role: result.role});

        } catch (error) {
            return next(error);
        }

        return res.json({access_token: accessToken});

    }
}

export default registerController;