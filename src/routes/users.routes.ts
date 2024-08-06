import { Router } from 'express';

//controller
import { getUsers, CreateUser, getUser } from '../controller/users.controller';

const router = Router();

router.route('/')
    .get(getUsers)
    .post(CreateUser)


router.route('/:id')
    .get(getUser)


export default router;