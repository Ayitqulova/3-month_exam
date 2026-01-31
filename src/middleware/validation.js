import { BadRequestError, InternalServerError } from "../utils/error.js";
import validation from "../validation/validation.js";
class UserMiddleware{
    register = (req,res,next) => {
       try {
         const {error} = validation.registerSchema.validate(req.body)
        if(error){
          next(new BadRequestError(400,error.details[0].message))
        }
        next()
       } catch (error) {
       throw next(new InternalServerError(500, error.message))
       }
    };

    login = (req,res,next) => {
      try {
        const {error} = validation.loginSchema.validate(req.body)
        if(error){
         return next(new BadRequestError(400, error.details[0].message))
        }
        next()
      } catch (error) {
        throw next(new InternalServerError(500, error.message))
      }
    }

}
export default new UserMiddleware()