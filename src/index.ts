import express from 'express';
import mongoose from 'mongoose';
import { mongoDBUri } from './config/config';
import authRouter from './routes/auth.routes'
import protectedRouter from './routes/protected.routes'
import othersRouter from './routes/other.routes'

const app = express();

app.use(express.json());

mongoose.connect(mongoDBUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

app.use(othersRouter)
app.use(authRouter)
app.use(protectedRouter)