import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { addThemesController } from '../controllers/theme/addTheme.controller';
import { getAllThemesController } from '../controllers/theme/getAllThemes.controller';
import { updateThemeController } from '../controllers/theme/UpdateUserTheme.controller';


const themeRouter = Router();



themeRouter.post('/add', authenticate, addThemesController);

themeRouter.get('/', authenticate, getAllThemesController);

themeRouter.post('/update', authenticate, updateThemeController);

export { themeRouter };