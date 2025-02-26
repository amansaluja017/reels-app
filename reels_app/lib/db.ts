import mongoose from 'mongoose';


const mongodb_uri = process.env.MONGODBURI!;

if(!mongodb_uri) {
    throw new Error('Missing MONGODBURI environment variable');
}

let cached = global.mongoose;

if(!cached) {
    cached = global.mongoose = {connection: null, promise: null}
}

export async function connection() {
    if(cached.connection) {
        return cached.connection;
    }

    if(!cached.promise) {
        const opts = {
            bufferCommands: true,
            maxPoolSize: 10,
        }

        cached.promise = mongoose.connect(mongodb_uri, opts).then(() => mongoose.connection);
    }

    try {
        cached.connection = await cached.promise;
    } catch (error) {
        cached.promise = null
        throw error;
    }

    return cached.connection;
}