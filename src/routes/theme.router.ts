import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { addThemesController } from '../controllers/theme/addTheme.controller';
import { getAllThemesController } from '../controllers/theme/getAllThemes.controller';


const themeRouter = Router();



themeRouter.post('/add', authenticate, addThemesController);

themeRouter.get('/', authenticate, getAllThemesController);

export { themeRouter };