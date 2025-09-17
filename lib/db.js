import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
 try {
   if (cached.conn) return cached.conn;

  if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      dbName: "kahi-madrasa", // optional but good practice
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
 } catch (error) {
  console.log(error);
  
 }
}
