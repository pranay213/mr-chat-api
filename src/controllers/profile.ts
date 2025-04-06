import { Request, Response } from 'express';
import response from '../utils/response';



export const getProfile = async (req: Request, res: Response): Promise<any> => {
    try {
        const profile = {
            id: '123', name: 'John Doe', email: 'john@example.com',
        };
        return response({ res, success: true, message: 'User registered', data: profile });
    } catch (error) {
        return response({
            res, success: false, message: 'Failed to fetch profile', error,
        });
    }
};
