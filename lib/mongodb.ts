import mongoose from 'mongoose';

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/cinehaven';
if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}
const mongoUri = uri;

const cached = globalThis as typeof globalThis & { mongoose?: MongooseCache };
if (!cached.mongoose) {
  cached.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  const cache = cached.mongoose;

  if (cache?.conn) {
    return cache.conn;
  }

  if (!cache) {
    throw new Error('MongoDB cache was not initialized.');
  }

  if (!cache.promise) {
    cache.promise = mongoose.connect(mongoUri, { dbName: 'cinehaven' });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}
