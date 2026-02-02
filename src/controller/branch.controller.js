import pool from "../db/config.js"
import { ConfligError } from "../utils/error.js";
class BranchController {
   async create(req,res, next){
   try {
        const { name, address } = req.body;
        const newBrand = await pool.query(
            "INSERT INTO branch(name, address) VALUES ($1, $2) RETURNING *", 
            [name, address]
        );

        return res.status(201).json({
            success: true,
            data: newBrand.rows[0],
            message: "Filial yaratildi"
        });

    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({
                success: false,
                message: "Bu filial allaqachon mavjud (Dublikat)!"
            });
        }
        next(error);
    }
}

   async getAll(req, res, next){
    try {
        const branch = await pool.query("Select * from branch")
        return res.status(200).json({
            success:true,
            data:branch.rows
        })
    } catch (error) {
        next(error)
    }
   }

   async update(req,res,next){
    try {
        const {id} = req.params
        const {name,address} = req.body
        const update = await pool.query("UPDATE branch SET name=$1, address=$2 where id=$3 RETURNING *" ,
            [name, address, id]
        );
        return res.status(201).json({
            success:true,
            status:201,
            message:"Branch update bo'ldi",
            data: update.rows[0]
        })
    } catch (error) {
        next(error)
    }
   }

  async delete(req, res, next) {
    try {
        const { id } = req.params;

        const result = await pool.query("DELETE FROM branch WHERE id = $1", [id]);

        if (result.rowCount === 0) {

            return res.status(404).json({
                success: false,
                status: 404,
                message: "O'chirish muvaffaqiyatsiz: Bunday IDli filial topilmadi! ❌"
            });
        }

        return res.status(200).json({
            success: true,
            status: 200,
            message: "Muvaffaqiyatli o'chirildi ✅"
        });

    } catch (error) {
        next(error);
    }
}


}

export default new BranchController();