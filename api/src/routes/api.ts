import { Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from '../constants/Paths';
import Member from '@src/models/Member';
import MemberRoutes from './MemberRoutes';
import LoginRoutes from './LoginRoutes';
import SessionRoutes from './SessionRoutes';


// **** Variables **** //

const apiRouter = Router(), validate = jetValidator();


// ** Add UserRouter ** //

const sessionRouter = Router();
const loginRouter = Router();
const memberRouter = Router();

sessionRouter.get(Paths.Sessions.Get, SessionRoutes.check);

loginRouter.post(Paths.Login.Add, LoginRoutes.login);
loginRouter.get(Paths.Login.Delete, LoginRoutes.logout);


// Get all Members
memberRouter.get(Paths.Members.Get, MemberRoutes.getAll);

// Add one member
memberRouter.post(
  Paths.Members.Add,
  validate(['member', Member.isMember]),
  MemberRoutes.add,
);

// Update one member
memberRouter.put(
  Paths.Members.Update,
  validate(['member', Member.isMember]),
  MemberRoutes.update,
);

// Add routers
apiRouter.use(Paths.Login.Base, loginRouter);
apiRouter.use(Paths.Sessions.Base, sessionRouter);
apiRouter.use(Paths.Members.Base, memberRouter);


// **** Export default **** //

export default apiRouter;
