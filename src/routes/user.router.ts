import { Router } from 'express';
import { getUserProfileController } from '../controllers/user/getUserProfile.controller';



const userRouter = Router();

userRouter.get('/:username', getUserProfileController);




// Export the auth router
export { userRouter };