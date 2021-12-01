import { RequestWithCookies } from 'src/types/Request.interface';

export const cookieExtractor = (field) => {
    return (req: RequestWithCookies) => req.cookies[field];
};
