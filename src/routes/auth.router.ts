// Creeate Auth Router Here 
import { Router } from 'express';
import { signupController } from '../controllers/auth/signup.controller';
import { userNameCheckController } from '../controllers/auth/userNameCheck.controller';
import { loginController } from '../controllers/auth/login.controller';

const authRouter = Router();

// Define the signup route
authRouter.post('/signup', signupController);

authRouter.get('/check-username', userNameCheckController);

authRouter.post('/login',loginController);


// Export the auth router
export { authRouter };
// This router handles authentication-related routes, such as user signup.
