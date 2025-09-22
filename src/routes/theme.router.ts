import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { addThemesController } from '../controllers/theme/addTheme.controller';


const themeRouter = Router();



themeRouter.post('/add', authenticate, addThemesController);



export { themeRouter };