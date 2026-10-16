const mongoose = require('mongoose');
const MONGODB_URI = process.env.mongoUrl;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI in config');
}

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 💡 fail fast if DB is unreachable
    }).then((mongoose) => {
      console.log("MongoDB connected successfully");
      return mongoose;
    }).catch((err) => {
      console.error("MongoDB connection error:", err);
      throw err;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = connectToDatabase;
