import { Router } from 'express';

//controller
import { getUsers, createUser, getUser, updateUser } from '../controller/users.controller';

const router = Router();

router.route('/')
    .get(getUsers)
    .post(createUser)


router.route('/:id')
    .get(getUser)
    .put(updateUser)


export default router;