import { Router } from 'express';
import { getUserInfo } from '../controllers/user/getUserProfileInfo.controller';
import { getUserProfile } from '../controllers/user/getUserProfile.controller';
import { authenticate } from '../middlewares/auth.middleware';



const userRouter = Router();

userRouter.get('/', getUserInfo);

userRouter.get('/profile', authenticate ,getUserProfile); // Assuming this is for getting the profile of the authenticated user




// Export the auth router
export { userRouter };