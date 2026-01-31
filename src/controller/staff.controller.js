import UserService from "../services/staff.service.js";
class StaffController{

        async register(req, res, next){
            try {
            const data = await UserService.register(req.body,next)
        if(data){
            return res.status(data.status).json(data)}   
        } catch (error) {
               next(error) 
            }

        }

        async verify(req,res,next){
            try {
                const data =await UserService.verify(req.body, next)
                if(data){
                    return res.status(data.status).json(data)
                }
            } catch (error) {
                next(error)
            }
        }
//  async login(req,res,next){
//             try {
//                 const data =await UserService.login(req.body, next)
//                 if(data){
//                     return res.status(data.status).json(data)
//                 }
//             } catch (error) {
//                 next(error)
//             }
//         }

        // async getAllStaff(req,res){

        // }
}

export default new StaffController()