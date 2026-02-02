import { config } from "dotenv"
config()
import express from "express"
import fileUpload from "express-fileupload"
import indexRouter from "./routers/index.js"
import fs from "fs"
import {join} from "path"
import pool from "./db/config.js"
import cors from 'cors'


const app = express()
app.use(express.json())
app.use(fileUpload())
app.use(indexRouter.staffRouter)
app.use(indexRouter.branchRouter)
app.use(indexRouter.transportRouter)


app.use((error, req,res,next) => {
    const status = error.status || 500;
    if(status < 500){
        return res.status(status).json({
            status:status,
            message:error.message,
            name:error.name
        })
    }else{
        let errorText = `\n[${new Date()}] -- ${req.method} -- ${req.url} -- ${error.message}`
        fs.appendFileSync(join(process.cwd(), 'src', 'logs', 'logger.txt'), errorText)
        return res.status(status).json({
            status:500,
            message:"InternalServerError"
        })
    }
    
})


app.listen(process.env.PORT,() => console.log("Server is running"));