import generateMembers from './tables/members/db-members-generator';
import generateAdmins from './tables/admins/db-admins-generator';
import generateTrainers from './tables/trainers/db-trainers-generator';
import generateEquipment from './tables/equipment/db-equipment-genetator';
import generateClasses from './tables/classes/db-classes-generator';
import generateRooms from './tables/rooms/db-rooms-generator';

const MEMBERS_SIZE = 5;
const ADMINS_SIZE = 5;
const TRAINERS_SIZE = 5;
const EQUIPMENT_VARIANTS_COUNT = 4;
const CLASSES_VARIANTS_COUNT = 4;

generateMembers(MEMBERS_SIZE);
generateAdmins(ADMINS_SIZE);
generateTrainers(TRAINERS_SIZE);
generateEquipment(EQUIPMENT_VARIANTS_COUNT);
generateClasses(CLASSES_VARIANTS_COUNT);
generateRooms();