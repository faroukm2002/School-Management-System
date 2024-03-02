import { connect, model } from 'mongoose';


export function dbConnection(){

    connect('mongodb://127.0.0.1:27017/Atlas').then(()=>{
    // connect(process.env.DB_ONLINE).then(()=>{

        console.log("db connected")
    }).catch((err)=>{
        console.log("database error ")
    })

}