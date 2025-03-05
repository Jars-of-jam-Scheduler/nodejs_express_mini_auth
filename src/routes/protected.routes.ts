import express, { Response } from 'express';
import { authMiddleware, jwtErrorHandler } from '../middleware/auth.middleware';

const router = express.Router();

router.use(authMiddleware);
router.use(jwtErrorHandler);

router.get('/protected/hello', (req: any, res: Response) => {
    const auth = req.auth;
    
    if (!auth || !auth.roles.includes('reader') || !auth.permissions.includes('read:data')) {
        return res.status(403).send({ message: 'Forbidden: Insufficient permissions.' });
    }
    
    res.send('Hello Authenticated User!');
});

export default router;