import Joi from "joi";
import { REFRESH_SECRET } from "../../config";
import { RefreshToken, User } from "../../models";
import { CustomErrorHandler, JwtService } from "../../services";
const refreshController = {
    async create(req, res, next){

        const refreshTokenSchema = Joi.object({
            refresh_token: Joi.string().required()
        });

        try {
            await refreshTokenSchema.validateAsync(req.body);
        } catch (error) {
            return next(error);
        }


        // database
        let refreshToken;
        try {
            refreshToken = await RefreshToken.findOne({token: req.body.refresh_token});

            if(!refreshToken){
                return next(CustomErrorHandler.noAuthorised("Invalid refresh token"));
            }

            let userId;
            try {
                const{_id} = await JwtService.verify(refreshToken.token, REFRESH_SECRET);

                userId = _id;

            } catch (error) {
                return next(CustomErrorHandler.noAuthorised("Invalid refresh token"));
            }



            // check user is present in the database
            const user = await User.findById(userId);

            if(!user){
                return next(CustomErrorHandler.notFound());
            }
            

            // delete prev token
            await RefreshToken.findByIdAndDelete(refreshToken._id);

             // access token

             const accessToken = JwtService.sign({_id: user._id, role: user.role});

             refreshToken = JwtService.sign({_id: user._id, role: user.role}, "1y", REFRESH_SECRET);
 
             
             //database
             await RefreshToken.create({token: refreshToken});

             return res.json({access_token: accessToken, refresh_token: refreshToken});

        } catch (error) {
            return next(error);
        }

    }
}

export default refreshController;