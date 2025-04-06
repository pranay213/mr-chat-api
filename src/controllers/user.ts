import { Request, Response } from 'express';
import response from '../utils/response';


export const registerUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { name, email, password } = req.body;
        return response({ res, success: true, message: 'User registered', data: { name, email } });
    } catch (error) {
        return response({ res, success: false, message: 'Failed to register', error });
    }
};
