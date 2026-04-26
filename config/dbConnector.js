import mongoose from "mongoose";
import 'dotenv/config'

const dbConnector = () => {
    try{
        mongoose.connect(`${process.env.MONGO}`)
        .then(()=> console.log("DB is Connected"))
    }
    catch(err){
        console.log("Failed to connect with Database");
    }
}

export default dbConnector