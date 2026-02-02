import pool from "../db/config.js";
class TransportController{
    async create(req,res,next){
          try {
        const {branch_id} = req.params
        const {name, modeli, color, img, price} = req.body
        
        const create = await pool.query("Insert into transport(branch_id, name, modeli, color, img, price) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *", 
            [branch_id, name, modeli, color, img, price]
        )
        return res.status(201).json({
            success:true,
            status:201,
            message:"Transport success created"
        })
    } catch (error) {
        
        if(error.code === '23503'){
            return res.status(404).json({
                success:false,
                status:404,
                message:"Xato: Bunday filiali mavjud emas afsuski❌"
            })
        }
       next(error) 
    }
    }

    async getAll(req,res,next){
        try {
            const transport = await pool.query("Select * from transport")
            return res.status(200).json({
                data: transport.rows
            })
        } catch (error) {
            next(error)
        }
    }

    async update(req,res,next){
       try {
         const {branch_id,id} = req.params 
        const {name, modeli, color, img, price} = req.body

        const update = await pool.query("UPDATE transport set branch_id=$1, name=$2, modeli=$3, color=$4, img=$5, price=$6 where id=$7 RETURNING *",
            [branch_id,name, modeli, color, img, price,id]
        )

        return res.status(201).json({
            success:"true",
            status:201,
            data:update.rows[0],
            message:"user success update ✅"
        })
       } catch (error) {
        next(error);
       }

    }

    async delete(req,res, next){
       try {
         const {branch_id,id} = req.params
        
        const result = await pool.query("DELETE FROM transport where branch_id=$1 and id=$2",
            [branch_id, id]
        )

        if(result.rowCount === 0){
            return res.status(404).json({
                success:false,
                message:"Bu filialda shunday transport topilmadi!"
            })
        }

        return res.status(200).json({
            success:true,
            status:200,
            message:"Transport success delete ✅"
        });
       } catch (error) {
        next(error)
       }
    }



}

export default new TransportController()