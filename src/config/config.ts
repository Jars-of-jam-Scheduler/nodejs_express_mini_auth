import dotenv from 'dotenv';

dotenv.config();

export const jwtSecret = process.env.JWT_SECRET || 'fallback_secret_for_dev_only';
if (jwtSecret === 'fallback_secret_for_dev_only') {
    console.warn("WARNING: JWT Secret is not set.");
}

export const mongoDBUri = process.env.MONGODB_URI || 'fallback_mongodb';
if (mongoDBUri === 'fallback_mongodb') {
    console.warn("WARNING: MONGODB_URI environment variable is not set.");
}