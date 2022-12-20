import Joi from "joi";
import { User, RefreshToken } from "../../models";
import { CustomErrorHandler, JwtService } from "../../services";
import bcrypt from "bcrypt";
import { REFRESH_SECRET } from "../../config";


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
        let refreshToken;
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
            refreshToken = JwtService.sign({_id: isPresent._id, role: isPresent.role}, "1y", REFRESH_SECRET);

            //database
            
            await RefreshToken.create({token: refreshToken});
            
        } catch (error) {
            return next(error);
        }

        return res.json({access_token: accessToken, refresh_token: refreshToken});
    },


    async logout(req, res, next){

        // validate
        const refreshTokenSchema = Joi.object({
            refresh_token: Joi.string().required()
        });

        try {
            await refreshTokenSchema.validateAsync(req.body);
        } catch (error) {
            return next(error);
        }


        // token is present in the database or not

            const refreshToken = await RefreshToken.findOne({token: req.body.refresh_token});

            if(!refreshToken){
                return next(CustomErrorHandler.noAuthorised("Invalid refresh token"));
            }


        try {
            await RefreshToken.deleteOne({token: req.body.refresh_token});
            
        } catch (error) {
            return next(new Error("Something went wront in the database"));
        }


        res.json({msg: "Success"});
    }
}

export default loginController;