const connection = require(`../config/database`)

class m_mahasiswa{
    static async getAll(){
        return new Promise((resolve, reject) => {
            connection.query(`select * from mahasiswa order by id_mahasiswa desc`, (err,rows) => {
                if(err){
                    reject(err);
                }else {
                    resolve(rows);
                }
            })
        })
    }
    static async writeData(data){
        return new Promise((resolve, reject) => {
            connection.query(`insert into mahasiswa set ?`, data, (err, result) => {
                if(err){
                    reject(err);
                }else {
                    resolve(result);
                }
            });
        })
    }
    static async editData(id){
        return new Promise((resolve, reject) => {
            connection.query(`select * from mahasiswa where id_mahasiswa = ${id}`, (err,rows) => {
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            });
        })
    }
    static async updateData(id,data){
        return new Promise((resolve, reject) => {
            connection.query(`update mahasiswa set ? where id_mahasiswa = ${id}`, data, (err,rows) => {
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            });
        })
    }
    static async deleteData(id){
        return new Promise((resolve, reject) => {
            connection.query(`delete from mahasiswa where id_mahasiswa = ${id}`, (err,rows) => {
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            })
        })
    }
}

module.exports = m_mahasiswa;