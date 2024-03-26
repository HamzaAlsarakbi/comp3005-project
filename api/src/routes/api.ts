import { Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from '../constants/Paths';
import Member from '@src/models/Member';
import UserRoutes from './MemberRoutes';
import LoginRoutes from './LoginRoutes';
import SessionRoutes from './SessionRoutes';


// **** Variables **** //

const apiRouter = Router(), validate = jetValidator();


// ** Add UserRouter ** //

const sessionRouter = Router();
const loginRouter = Router();
const userRouter = Router();

sessionRouter.get(Paths.Sessions.Get, SessionRoutes.check);

loginRouter.post(Paths.Login.Add, LoginRoutes.login);
loginRouter.get(Paths.Login.Delete, LoginRoutes.logout);


// Get all Members
userRouter.get(Paths.Members.Get, UserRoutes.getAll);

// Add one user
userRouter.post(
  Paths.Members.Add,
  validate(['member', Member.isMember]),
  UserRoutes.add,
);

// Update one user
userRouter.put(
  Paths.Members.Update,
  validate(['member', Member.isMember]),
  UserRoutes.update,
);

// Delete one user
// userRouter.delete(
//   Paths.Members.Delete,
//   validate(['id', 'number', 'params']),
//   UserRoutes.delete,
// );

// Add routers
apiRouter.use(Paths.Login.Base, loginRouter);
apiRouter.use(Paths.Sessions.Base, sessionRouter);
apiRouter.use(Paths.Members.Base, userRouter);


// **** Export default **** //

export default apiRouter;
