import { Response } from 'express';

export interface ResponseOptions {
    res: Response | any;
    success: boolean;
    message: string;
    data?: any;
    error?: any;
    statusCode?: number;
}

const response = ({
    res,
    success,
    message,
    data,
    error,
    statusCode = success ? 200 : 400,
}: ResponseOptions) => {
    return res.status(statusCode).json({
        success,
        message,
        ...(success ? { data } : { error }),
    });
};

export default response;
