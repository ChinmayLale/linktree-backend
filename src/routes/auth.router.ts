// Creeate Auth Router Here 
import { Router } from 'express';
import { signupController } from '../controllers/auth/signup.controller';


const authRouter = Router();

// Define the signup route
authRouter.post('/signup', signupController);



// Export the auth router
export { authRouter };
// This router handles authentication-related routes, such as user signup.
