import { Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from '../constants/Paths';
import Member from '@src/models/Member';
import MemberRoutes from './MemberRoutes';
import LoginRoutes from './LoginRoutes';
import SessionRoutes from './SessionRoutes';
import Admin from '@src/models/Admin';
import EquipmentRoutes from './EquipmentRoutes';
import TrainerRoutes from './TrainerRoutes';
import RoomRoutes from './RoomRoutes';


// **** Variables **** //

const apiRouter = Router(), validate = jetValidator();


// ** Add UserRouter ** //

const sessionRouter = Router();
const equipmentRouter = Router();
const loginRouter = Router();
const classesRouter = Router();
const trainerRouter = Router();
const roomRouter = Router();
const memberRouter = Router();

sessionRouter.get(Paths.Sessions.Get, SessionRoutes.check);

equipmentRouter.get(
  Paths.Equipment.All,
  // validate(['admin', Admin.isAdmin]),
  EquipmentRoutes.getAll,
);

roomRouter.get(Paths.Rooms.All, RoomRoutes.getAll);
trainerRouter.get(Paths.Trainers.All, TrainerRoutes.getAll);

loginRouter.post(Paths.Login.Add, LoginRoutes.login);
loginRouter.get(Paths.Login.Delete, LoginRoutes.logout);


// Get all Members
memberRouter.get(Paths.Members.All, MemberRoutes.getAll);

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
apiRouter.use(Paths.Equipment.Base, equipmentRouter);
apiRouter.use(Paths.Classes.Base, classesRouter);
apiRouter.use(Paths.Trainers.Base, trainerRouter);
apiRouter.use(Paths.Rooms.Base, roomRouter);


// **** Export default **** //

export default apiRouter;
