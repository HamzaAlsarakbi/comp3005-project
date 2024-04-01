import { postgresQuery } from '@src/db/postgres-helpers';
import { AddMember, IMember, UMember } from '@src/models/Member';
import { toSQLDate } from '@src/util/misc';


/**
 * gets all members
 * @returns all members
 */
const getAll = async (): Promise<IMember[]> => {
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
  const newAttributes: string[] = [];
  for (const key of Object.keys(m)) {
    if (!m[key] || key === 'member_email') continue;
    newAttributes.push(`${key}=${typeof m[key] === 'string' ?
      `'${m[key] as string}'` :
      String(m[key])}`);
  }
  if(newAttributes.length === 0) return;
  await postgresQuery<IMember>(
    `update members set ${newAttributes.join(',')} where member_email='${m.member_email}';`,
  );
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