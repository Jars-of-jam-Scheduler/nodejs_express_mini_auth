import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/User';
import { jwtSecret } from '../config/config';

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({ message: 'Username and password are required.' });
    }

    const user = await User.findByUsername(username);

    if (!user) {
        return res.status(401).send({ message: 'Invalid username or password.' });
    }

    try {
        const passwordMatch = await bcrypt.compare(password, user.passwordHash);

        if (!passwordMatch) {
            return res.status(401).send({ message: 'Invalid username or password.' });
        }

        const payload = {
            username: user.username,
            roles: user.roles,
            permissions: user.permissions
        };

        const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

        res.send({ token });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).send({ message: 'Login failed. Please try again.' });
    }
};

export const register = async (req: Request, res: Response) => {
    const { username, password, roles, permissions } = req.body;

    if (!username || !password) {
        return res.status(400).send({ message: 'Username and password are required for registration.' });
    }

    try {
        const existingUser = await User.findByUsername(username);
        if (existingUser) {
            return res.status(409).send({ message: 'Username already exists.' });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            passwordHash,
            roles: roles || ['reader'],
            permissions: permissions || ['read:data']
        });

        await newUser.save();

        res.status(201).send({ message: 'User registered successfully.' });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).send({ message: 'Registration failed. Please try again.' });
    }
};