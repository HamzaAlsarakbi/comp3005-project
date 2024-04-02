import { Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from '../constants/Paths';
import Member from '@src/models/Member';
import MemberRoutes from './MemberRoutes';
import LoginRoutes from './LoginRoutes';
import SessionRoutes from './SessionRoutes';
import EquipmentRoutes from './EquipmentRoutes';
import TrainerRoutes from './TrainerRoutes';
import RoomRoutes from './RoomRoutes';
import ClassRoutes from './ClassRoutes';
import HealthGoalRoutes from './HealthGoalRoutes';
import PaymentRoutes from './PaymentRoutes';
import RoutineRoutes from './RoutineRoutes';


// ==== Variables ==== //

const apiRouter = Router(), validate = jetValidator();


const sessionRouter = Router();
const equipmentRouter = Router();
const loginRouter = Router();
const classRouter = Router();
const trainerRouter = Router();
const roomRouter = Router();
const memberRouter = Router();
const healthGoalRouter = Router();
const paymentRouter = Router();
const routineRouter = Router();

// ==== Sessions ==== //
sessionRouter.get(Paths.Sessions.Get, SessionRoutes.check);

// ==== Login ==== //
loginRouter.post(Paths.Login.Add, LoginRoutes.login);
loginRouter.get(Paths.Login.Delete, LoginRoutes.logout);

// ==== Classes ==== //
classRouter.get(Paths.Classes.All, ClassRoutes.getAll);

// ==== Equipment ==== //
equipmentRouter.get(
  Paths.Equipment.All,
  // validate(['admin', Admin.isAdmin]),
  EquipmentRoutes.getAll,
);
equipmentRouter.get(
  Paths.Equipment.One,
  // validate(['admin', Admin.isAdmin]),
  EquipmentRoutes.getOne,
);

equipmentRouter.put(
  Paths.Equipment.Update,
  EquipmentRoutes.update,
);

// ==== Rooms ==== //
roomRouter.get(Paths.Rooms.All, RoomRoutes.getAll);

// ==== Trainers ==== //
trainerRouter.get(Paths.Trainers.All, TrainerRoutes.getAll);
trainerRouter.get(Paths.Trainers.One, TrainerRoutes.getOne);

// ==== Health Goals ==== //
healthGoalRouter.get(Paths.HealthGoals.All, HealthGoalRoutes.getAll);
healthGoalRouter.post(Paths.HealthGoals.Add, HealthGoalRoutes.addOne);
healthGoalRouter.put(Paths.HealthGoals.Update, HealthGoalRoutes.updateOne);
healthGoalRouter.delete(Paths.HealthGoals.Delete, HealthGoalRoutes.deleteOne);

// ==== Pauments ==== //
paymentRouter.get(Paths.Payments.All, PaymentRoutes.getAll);
paymentRouter.post(Paths.Payments.Add, PaymentRoutes.addOne);
paymentRouter.put(Paths.Payments.Process, PaymentRoutes.processOne);
paymentRouter.put(Paths.Payments.Cancel, PaymentRoutes.cancelOne);

// ==== Routines ==== //
routineRouter.get(Paths.Routines.All, RoutineRoutes.getAll);
routineRouter.post(Paths.HealthGoals.Add, RoutineRoutes.addOne);
routineRouter.put(Paths.HealthGoals.Update, RoutineRoutes.updateOne);
routineRouter.delete(Paths.HealthGoals.Delete, RoutineRoutes.deleteOne);

// ==== Members ==== //
memberRouter.get(Paths.Members.All, MemberRoutes.getAll);
memberRouter.get(Paths.Members.One, MemberRoutes.getOne);
memberRouter.post(
  Paths.Members.Add,
  validate(['member', Member.isMember]),
  MemberRoutes.add,
);
memberRouter.put(
  Paths.Members.Update,
  validate(['member', Member.isUMember]),
  MemberRoutes.updateOne,
);

// ==== Add Routers ==== //
apiRouter.use(Paths.Login.Base, loginRouter);
apiRouter.use(Paths.Sessions.Base, sessionRouter);
apiRouter.use(Paths.Members.Base, memberRouter);
apiRouter.use(Paths.HealthGoals.Base, healthGoalRouter);
apiRouter.use(Paths.Equipment.Base, equipmentRouter);
apiRouter.use(Paths.Classes.Base, classRouter);
apiRouter.use(Paths.Trainers.Base, trainerRouter);
apiRouter.use(Paths.Rooms.Base, roomRouter);
apiRouter.use(Paths.Payments.Base, paymentRouter);
apiRouter.use(Paths.Routines.Base, routineRouter);


// ==== Export default ==== //

export default apiRouter;
