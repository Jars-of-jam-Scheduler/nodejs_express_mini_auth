import express, { Response } from 'express';

const router = express.Router();

router.get('/', (_req: any, res: Response) => {
    res.send('Mini App JWT Auth is running with MongoDB!');
});

export default router;