import { Router } from "express";
import { getAllUserLinksController } from "../controllers/Link/getAllUserLinks.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { addUserLinkController } from "../controllers/Link/AddUserLink.controller";
import { PublishLinkController } from "../controllers/Link/PublishLink.controller";
import { LinkAnalyticsController } from "../controllers/Link/LinkAnalytics.controller";
import { deleteLinkController } from "../controllers/Link/DeleteLink.controller";



const linkRouter = Router();


linkRouter.get('/all', authenticate, getAllUserLinksController);


linkRouter.post('/add', authenticate, addUserLinkController);


linkRouter.post('/publish', authenticate, PublishLinkController);


linkRouter.post('/analytics/addclick', authenticate, LinkAnalyticsController.AddClickToLinkController);

linkRouter.delete('/delete', authenticate, deleteLinkController);


export { linkRouter };