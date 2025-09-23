import { Router } from "express";
import { getAllUserLinksController } from "../controllers/Link/getAllUserLinks.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { addUserLinkController } from "../controllers/Link/AddUserLink.controller";



const linkRouter = Router();


linkRouter.get('/all', authenticate, getAllUserLinksController);


linkRouter.post('/add', authenticate, addUserLinkController);




export { linkRouter };