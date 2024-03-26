import { Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from '../constants/Paths';
import User from '@src/models/User';
import UserRoutes from './UserRoutes';
import LoginRoutes from './LoginRoutes';


// **** Variables **** //

const apiRouter = Router(), validate = jetValidator();


// ** Add UserRouter ** //

const userRouter = Router();
const loginRouter = Router();

loginRouter.post(Paths.Login.Add, LoginRoutes.post);


// Get all users
userRouter.get(Paths.Users.Get, UserRoutes.getAll);

// Add one user
userRouter.post(
  Paths.Users.Add,
  validate(['user', User.isUser]),
  UserRoutes.add,
);

// Update one user
userRouter.put(
  Paths.Users.Update,
  validate(['user', User.isUser]),
  UserRoutes.update,
);

// Delete one user
userRouter.delete(
  Paths.Users.Delete,
  validate(['id', 'number', 'params']),
  UserRoutes.delete,
);

// Add routers
apiRouter.use(Paths.Users.Base, userRouter);
apiRouter.use(Paths.Login.Base, loginRouter);


// **** Export default **** //

export default apiRouter;
