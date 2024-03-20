const connection = require(`../config/database`);

class m_kategori{
    static async getAll(){
        return new Promise((resolve, reject) => {
            connection.query(`select * from kategori order by id_kategori desc`, function(err, rows){
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                } 
            });    
        })
    };
    static async writeData(data){
        return new Promise((resolve, reject) => {
            connection.query(`insert into kategori set ?`, data, function(err, result){
                if(err){
                    reject(err);
                }else{
                    resolve(result);
                }
            })
        })
    }
    static async editData(id){
        return new Promise((resolve, reject) => {
            connection.query(`select * from kategori where id_kategori = ${id}`, function(err, rows){
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            })
        })
    }
    static async updateData(id, data){
        return new Promise((resolve,reject) => {
            connection.query(`update kategori set ? where id_kategori = ${id}`, data, function(err,rows){
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            })
        })
    }
    static async deleteData(id){
        return new Promise((resolve,reject) => {        
            connection.query(`delete from kategori where id_kategori = ${id}`, function(err, rows){
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            })
        });
    }
}

module.exports = m_kategori;