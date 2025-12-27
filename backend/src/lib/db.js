import moongose from "mongoose";//connect and interact with database

export const connectDB = async () => {
    try {
       const conn = await moongose.connect(process.env.MONGODB_URI);
       console.log(`MONGODB connected : ${conn.connection.host}`)
    } catch (error) {
       console.log("MONGODB connection error : ", error)
    }
}