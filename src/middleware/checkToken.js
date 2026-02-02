import JWT from "jsonwebtoken"

export default async(req, res,next ) => {
    try {
       if(!req.headers.authorization){
        return res.status(401).json({
            status:401,
            message:"TOkensiz yuborish taqiqlanadi❌"
        })
       }

       const token = req.headers.authorization.split(" ")[1]

       const user = JWT.verify(token, process.env.JWT_SECRET || "shaftoli");      
       req.user = user
       next()
        
    } catch (error) {
      return res.status(401).json({ message: "Token yaroqsiz yoki muddati o'tgan" });        
    }
}