/* eslint-disable no-console */
import { connect } from 'ts-postgres';
import parseSqlFile from './../../util/sql-query-parser';
import { DB_CONFIG } from '../../../constants/DBConfig';

const sqlFilePath = `${__dirname}/members-table.sql`;
import jsonfile from 'jsonfile';
import FullNameDB from './../../util/name-generator';
import { randomInt } from 'crypto';
import { Gender } from './../../../models/misc';
import { randomDate } from './../../util/date-generator';
import path from 'path';

const generateMembers = async (size: number) => {
  const baseQueries = parseSqlFile(sqlFilePath);
  await using client = await connect(DB_CONFIG);
  for (const query of baseQueries) {
    const res = await client.query(query);
    console.log(query, res);
  }
  const fullNames: FullNameDB[] = await jsonfile.readFile(
    path.join(__dirname, './../../util/fullnames.json'),
  ) as FullNameDB[];
  const emails: string[] = [];
  const values = [];
  for (let i = 0; i < size; i++) {
    let first_name: string = '',
      last_name: string = '',
      email: string = '',
      password: string = '',
      gender: string = '',
      phone: string = '',
      birthday: Date = new Date();
    while (email === '' || emails.includes(email)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const name: FullNameDB = fullNames[randomInt(fullNames.length)];
      // eslint-disable-next-line max-len
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      first_name = name.first_name;
      // eslint-disable-next-line max-len
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      last_name = name.last_name;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      email = `${name.first_name}.${name.last_name}@gmail.com`.toLowerCase();
      // eslint-disable-next-line max-len
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      password = name.first_name;
      phone = `1613${randomInt(100, 1000)}${randomInt(1000, 10000)}`;
      birthday = randomDate();
      gender = randomInt(0, 2) == 0 ? Gender.Female : Gender.Male;
    }

    emails.push(email);
    // eslint-disable-next-line max-len
    values.push(`('${email}','${first_name}','${last_name}','${password}','${phone}','${birthday!.toISOString().split('T')[0]}', '${gender}', ${randomInt(100, 200)}, ${randomInt(100, 200)})`)
    // INSERT INTO members (first_name, last_name, bio) VALUES 
  }
  // eslint-disable-next-line max-len, quotes
  values.push(`('hamzaalsarakbi@gmail.com','Hamza','Alsarakbi','hamza','16131234567','2000-01-01', 'male', 200, 193)`);
  // eslint-disable-next-line max-len, quotes
  values.push(`('jadfakhoury@gmail.com','Jad','Fakhoury','jad','16131234568','2000-01-02', 'male', 200, 200)`);
  // eslint-disable-next-line max-len
  const insertionQuery =`insert into members (member_email, first_name, last_name, password, phone, birthday, gender, current_weight, current_height) values ${values.join(',')};`;
  console.log(insertionQuery);
  const res = await client.query(insertionQuery);
  console.log(res);
};




export default generateMembers;