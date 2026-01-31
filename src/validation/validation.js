import Joi from "joi";
class Validation {
    registerSchema = Joi.object({
        username:Joi.string().alphanum().required().min(3).max(20),
        email:Joi.string().email().required(),
        password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).required()
    });

    loginSchema = Joi.object({
        username:Joi.string().alphanum().required().min(3).max(20),
        password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).required()
    });
}
export default new Validation()
