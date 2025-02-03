import mongoose from "mongoose";

const connectDB = async (DB_URL, dbName) => {
    try {
        const connection = mongoose.createConnection(DB_URL, {
            dbName,
        });
        console.log(`${dbName} Database Connected Successfully`);
        return connection;
    } catch (error) {
        console.log('Database connection error:', error);
        throw error;
    }
};
 
export default connectDB;

