import pool from "../db/config.js";
import { hashPassword } from "../utils/bcrypt.js";
import JWT from "jsonwebtoken";
import { comparePassword } from "../utils/bcrypt.js";
import fs from "fs";
import { join } from "path";
import {sendOTP} from "../utils/sendemail.js";
import { BadRequestError, ConfligError, NotFoundError } from "../utils/error.js";

const filepath = join(process.cwd(), 'src', 'db', 'otp.json')    

class UserService{

    async register(body, next){
        try {
        const { username, password, email, branch_id, birthday, gender } = body;

          const existUser = await pool.query("select * from staff where username=$1", [username])
        if(existUser.rowCount){
         return next(new ConfligError(409, "User already exist"))
        }

        const otp = Math.floor(100000 + Math.random() * 900000)

        const data = JSON.parse(fs.readFileSync(filepath, 'utf-8'))


        data.push({ username, email, password,branch_id: branch_id || null,birthday: birthday || null,gender: gender || null,otp, role: 'user' 
        });
        fs.writeFileSync(filepath, JSON.stringify(data, null, 2))
       
        console.log("KOD TERMINALDA: ", otp); 
        
        return{
            status:200,
            message:"Kod emailingizga yuborildi ✅ "
        }
    }catch(error){
      return  next(error)  
        }
    };

    async verify(body, next){
        try {
             const { email, otp } = body
            const data = JSON.parse(fs.readFileSync(filepath, "utf-8"))
            const staff = data.find(u => u.email === email && u.otp === Number(otp))

            if(!staff){
                return next( new BadRequestError(400, "Wrong code or wrong email"))
            }

            const newUser = await pool.query("INSERT INTO staff(username, password, email,branch_id,birthday, gender, role) values($1,$2,$3,$4,$5,$6,$7) RETURNING *",
            [ staff.username,await hashPassword(staff.password),staff.email,staff.branch_id || null,staff.birthday || null,staff.gender || null,'user']
            
        );

        const updatedData = data.filter(u => u.email !== email);
            fs.writeFileSync(filepath, JSON.stringify(updatedData, null, 2));
        

        const user = newUser.rows[0]
        return{
            status:201,
            message:"User success created",
            accessToken:JWT.sign({id:user.id, username:user.username, role:user.role}, process.env.JWT_SECRET, {expiresIn:'10m'}),

        };
        } catch (error) {
            if (error.code === '23505') {
            return next(new ConfligError(409, "Bu foydalanuvchi allaqachon mavjud"));}
              return next(error)
    }

        
     
    }

    async login(body, next){
        const {username, password} = body
        
        const existUser = await pool.query("Select * from staff where username=$1",[username])

         if(!existUser.rowCount){ // user bolmasa 
            return new NotFoundError (409, "Username or Password wrong");
        }
            
        if(!(await comparePassword(password, existUser.rows[0].password))){
            return new NotFoundError (409, "Username or Password wrong");
        }

        return {
            status: 200,
            message:"User success login",
            accessToken: JWT.sign({id: existUser.rows[0].id, username: existUser.rows[0].username, role: existUser.rows[0].role},
            process.env.JWT_SECRET,
            { expiresIn: "1d"}),

            // refreshToken: JWT.sign({id:existUser.rows[0].id, username: existUser.rows[0].username},
            // process.env.JWT_SECRET,
            // {expiresIn: "1y"}
            // ),

        }
    }

    

    async getAllStaff(req, res, next) {
    try {
        const staff = await pool.query("SELECT id, username, email, role, branch_id, gender, birthday FROM staff");
        return res.status(200).json({
            status: 200,
            data: staff.rows
        });
    } catch (error) {
        next(error);
    }
}



   async updateStaff(id, body, next) {
    try {
        const { role, username, branch_id } = body;

        const updated = await pool.query(
            "UPDATE staff SET role = $1, username = $2, branch_id = $3 WHERE id = $4 RETURNING *",
            [role, username, branch_id, id]
        );

        if (updated.rowCount === 0) {
            return next(new NotFoundError(404, "Xodim topilmadi"));
        }

        return {
            status: 200,
            message: "Xodim ma'lumotlari yangilandi ✅",
            data: updated.rows[0]
        };
    } catch (error) {
        return next(error);
    }
}

    async deleteStaff(id, next) {
        try {
            const result = await pool.query("DELETE FROM staff WHERE id = $1", [id]);
            if (result.rowCount === 0) return next(new NotFoundError(404, "Xodim topilmadi"));

            return {
                status: 200,
                message: "Xodim muvaffaqiyatli o'chirildi ✅"
            };
        } catch (error) { return next(error); }
    }

}
export default new UserService()