import { postgresQuery } from '@src/db/postgres-helpers';
import { AddMember, IMember, UMember } from '@src/models/Member';


/**
 * gets all members
 * @returns all members
 */
const getAll = async(): Promise<IMember[]> => {
  const members = await postgresQuery<IMember>('select * from members');
  return members;
};

/**
 * Gets one member using the email
 * @param email email address of member
 * @returns the member if there is one with the provided email, otherwise null.
 */
const getOne = async (email: string): Promise<IMember | null> => {
  const member = await postgresQuery<IMember>(
    `select * from members where member_email='${email}'`);

  return member.length == 0 ? null : member[0];
};

/**
 * Updates a member
 * @param m member
 * @returns void
 */
const updateOne = async (m: UMember): Promise<void> => {
  const birthday: string | null = m.birthday ?
    new Date(m.birthday).toISOString().split('T')[0] : null;
  const member = await postgresQuery<IMember>(`
    update members
    set
      ${m.first_name ?      `first_name       ='${m.first_name}',`       : ''}
      ${m.last_name ?       `last_name        ='${m.last_name}',`        : ''}
      ${m.password ?        `password         ='${m.password}',`         : ''}
      ${m.phone ?           `phone            ='${m.phone}',`            : ''}
      ${m.gender ?          `gender           ='${m.gender}',`           : ''}
      ${m.birthday ?        `birthday         ='${birthday}',` : ''}
      ${m.current_weight ?  `current_weight   =${m.current_weight},`   : ''}
      ${m.current_height ?  `current_height   =${m.current_height},`   : ''}
    where member_email='${m.member_email}';
    `);
  console.log('UPDATING MEMBER', member); 
};


/**
 * Updates a member
 * @param m member
 * @returns void
 */
const addOne = async (m: AddMember): Promise<void> => {
  const birthday = new Date(m.birthday).toISOString().split('T')[0];
  const member = await postgresQuery<AddMember>(`
    insert into members (member_email,first_name, last_name,
      password, phone, birthday, gender)
    values ('${m.member_email}', '${m.first_name}', '${m.last_name}',
      '${m.password}', '${m.phone}', '${birthday}', '${m.gender}')
    `);
  console.log('ADDING MEMBER', member); 
};



export default {
  getAll,
  getOne,
  updateOne,
  addOne,
};