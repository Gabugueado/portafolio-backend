import { Router } from 'express';

//controller
import { getUsers, createUser, getUser, updateUser, deleteUser } from '../controller/users.controller';

const router = Router();

router.route('/')
    .get(getUsers)
    .post(createUser)


router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)


export default router;