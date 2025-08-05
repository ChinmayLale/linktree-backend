import { Request, Response, NextFunction } from "express";
declare const userNameCheckController: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export { userNameCheckController };
