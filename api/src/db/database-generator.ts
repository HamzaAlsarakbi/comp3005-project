import generateMembers from './tables/members/db-members-generator';
import generateAdmins from './tables/admins/db-admins-generator';
import generateTrainers from './tables/trainers/db-trainers-generator';

const MEMBERS_SIZE = 5;
const ADMINS_SIZE = 5;
const TRAINERS_SIZE = 5;


generateMembers(MEMBERS_SIZE);
generateAdmins(ADMINS_SIZE);
generateTrainers(TRAINERS_SIZE);