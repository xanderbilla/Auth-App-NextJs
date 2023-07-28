import mongoose from 'mongoose'

export const connect = async () => {
    try {
        mongoose.connect(process.env.MONGO_URL!) // ! means it doesn't need to worry about that much because that URL will be always available
        const connection = mongoose.connection;

        // connection successful

        connection.on('connected', () => {
            console.log('MongoDB Connected Successfully!!');
            
        })

        // connection failed

        connection.on('error', (err) => {
            console.log(`MongoDB Connection Error. Please make sure MongoDB is running..! | ${err}`);
            process.exit();
        })  

    } catch (error) {
        console.log('Something went wrong!!!');
        console.log(error);
        
    }
}