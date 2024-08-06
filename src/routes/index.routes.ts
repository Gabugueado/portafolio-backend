import { Router } from 'express';

//controller
import { indexWelcome } from '../controller/index.controller';

const router = Router();

router.route('/')
    .get(indexWelcome)


export default router;