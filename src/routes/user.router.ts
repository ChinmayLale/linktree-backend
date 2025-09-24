import { Router } from 'express';
import { getUserInfo } from '../controllers/user/getUserProfileInfo.controller';
import { getUserProfile } from '../controllers/user/getUserProfile.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { updateUserProfileController } from '../controllers/user/updateUserProfile.controller';
import { getUserProfileByUsernameController } from '../controllers/user/getUserProfileByUsername.controller';



const userRouter = Router();

userRouter.get('/', getUserInfo);

userRouter.get('/profile', authenticate, getUserProfile); // Assuming this is for getting the profile of the authenticated user



userRouter.post('/profile', authenticate, updateUserProfileController);

userRouter.get('/profile/:userName', getUserProfileByUsernameController);
// Export the auth router
export { userRouter };