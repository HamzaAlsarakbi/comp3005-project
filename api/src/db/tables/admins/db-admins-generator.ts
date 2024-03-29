/* eslint-disable no-console */
import { connect } from 'ts-postgres';
import parseSqlFile from './../../util/sql-query-parser';
import { DB_CONFIG } from '../../../constants/DBConfig';

const sqlFilePath = `${__dirname}/admins-table.sql`;
import jsonfile from 'jsonfile';
import FullNameDB from './../../util/name-generator';
import { randomInt } from 'crypto';
import path from 'path';

const generateAdmins = async (size: number) => {
  const baseQueries = parseSqlFile(sqlFilePath);
  await using client = await connect(DB_CONFIG);
  console.log('Admins table generator.');
  console.log('\tDropping table.');
  for (const query of baseQueries) {
    const res = await client.query(query);
    console.log(`\t\t${res.status}`);
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
      password: string = '';
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
      email = `a.${name.first_name}.${name.last_name}@gmail.com`.toLowerCase();
      // eslint-disable-next-line max-len
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      password = name.first_name;
    }

    emails.push(email);
    // eslint-disable-next-line max-len
    values.push(`('${email}','${first_name}','${last_name}','${password}')`);
    // INSERT INTO admins (first_name, last_name, bio) VALUES 
  }
  // eslint-disable-next-line max-len, quotes
  values.push(`('adminhamza@gmail.com','A.Hamza','Admin','hamza')`);
  // eslint-disable-next-line max-len, quotes
  values.push(`('adminjad@gmail.com','A.Jad','Admin','jad')`);
  // eslint-disable-next-line max-len
  const insertionQuery =`insert into admins (admin_email, first_name, last_name, password) values ${values.join(',')};`;
  console.log(`\tInserting ${insertionQuery.length} records into admins table.`);
  const res = await client.query(insertionQuery);
  console.log(`\t\t${res.status}`);
};




export default generateAdmins;