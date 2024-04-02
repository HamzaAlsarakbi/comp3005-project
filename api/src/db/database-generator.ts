import generateMembers from './tables/members/db-members-generator';
import generateAdmins from './tables/admins/db-admins-generator';
import generateTrainers from './tables/trainers/db-trainers-generator';
import generateEquipment from './tables/equipment/db-equipment-genetator';
import generateClasses from './tables/classes/db-classes-generator';
import generateRooms from './tables/rooms/db-rooms-generator';
import generateBookings from './tables/bookings/db-bookings-generator';
import generateMemberSchedules from './tables/member_schedules/db-member_schedules-generator';
import generateTrainerSchedules from './tables/trainer_schedules/db-trainer_schedules-generator';

const MEMBERS_SIZE = 5;
const ADMINS_SIZE = 5;
const TRAINERS_SIZE = 5;
const EQUIPMENT_VARIANTS_COUNT = 4;
const BOOKINGS_SIZE = 4;
const MEMBER_SCHEDULE_SIZE = 4;
const TRAINER_SCHEDULE_SIZE = 4;

const generateDatabase = async () => {
  await generateMembers(MEMBERS_SIZE);
  await generateAdmins(ADMINS_SIZE);
  await generateTrainers(TRAINERS_SIZE);
  await generateEquipment(EQUIPMENT_VARIANTS_COUNT);
  await generateClasses();
  await generateRooms();
  await generateBookings(BOOKINGS_SIZE);
  await generateMemberSchedules(MEMBER_SCHEDULE_SIZE);
  await generateTrainerSchedules(TRAINER_SCHEDULE_SIZE);
};

generateDatabase();


