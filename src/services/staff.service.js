import pool from "../db/config.js";
import { hashPassword } from "../utils/bcrypt.js";
import JWT from "jsonwebtoken";
import fs from "fs";
import { join } from "path";
import {sendOTP} from "../utils/sendemail.js";
import { BadRequestError, ConfligError } from "../utils/error.js";

const filepath = join(process.cwd(), 'src', 'db', 'otp.json')    

class UserService{

    async register(body, next){
        try {
         const {username, password, email} = body

          const existUser = await pool.query("select * from staff where username=$1", [username])
        if(existUser.rowCount){
         return next(new ConfligError(409, "User already exist"))
        }

        const otp = Math.floor(100000 + Math.random() * 900000)

        const data = JSON.parse(fs.readFileSync(filepath, 'utf-8'))

        data.push({username, email, password, otp});
        fs.writeFileSync(filepath, JSON.stringify(data))
        // await sendOTP(email, otp)
        console.log("!!! KOD TERMINALDA: ", otp); // <-- Shuni qo'shing
        
        return{
            status:200,
            message:"Kod emailingizga yuborildi ✅"
        }
    }catch(error){
      return  next(error)  
        }
    };

    async verify(body, next){
        try {
             const { email, otp } = body
            const data = JSON.parse(fs.readFileSync(filepath, "utf-8"))
            const staff = data.find(u => u.email === email && u.otp === otp)

            if(!staff){
                return next(BadRequestError(400, "Wrong code"))
            }

            const newUser = await pool.query("INSERT INTO staff(username, password, email) values($1,$2,$3) RETURNING *",
            [staff.username, await hashPassword(staff.password), staff.email]
        );

        const user = newUser.rows[0]
        return{
            status:201,
            message:"User success created",
            accessToken:JWT.sign({id:user.id, username:user.username}, process.env.JWT_SECRET, {expiresIn:'10m'}),
            refreshToken:JWT.sign({id:user.id, username:user.username}, process.env.JWT_SECRET, {expiresIn:'1d'}),

        };
        } catch (error) {
           return next(error)
        }
    }

        
     
    }

    // async login(){

    // }

    // async getAllStaff(){

    // }


export default new UserService()