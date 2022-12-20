import Joi from "joi";
const productSchema = Joi.object({
    name: Joi.string().required(),
    size: Joi.string().required(),
    price: Joi.number().required()
});

export default productSchema;