import { NextFunction, Request, Response } from "express";
declare const loginController: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export { loginController };
