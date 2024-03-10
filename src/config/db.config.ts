import mongoose from "mongoose";

const connectDB = (url: any) => {
    //mongoose.connect("mongodb://127.0.0.1:27017/moviedb");
    mongoose.connect(url);

    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB');
      });
      
    mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
      });
}

export default connectDB