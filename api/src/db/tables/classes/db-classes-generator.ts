/* eslint-disable no-console */
import { connect } from 'ts-postgres';
import parseSqlFile from './../../util/sql-query-parser';
import { DB_CONFIG } from '../../../constants/DBConfig';

const sqlFilePath = `${__dirname}/classes-table.sql`;
import jsonfile from 'jsonfile';
import { randomInt } from 'crypto';
import { ClassType } from '../../../models/Class';

interface ClassName {
  name: string;
  description: string;
}

const generateClasses = async (variants_count: number) => {
  const baseQueries = parseSqlFile(sqlFilePath);
  await using client = await connect(DB_CONFIG);
  console.log('Classes table generator.');
  console.log('\tDropping table.');
  for (const query of baseQueries) {
    const res = await client.query(query);
    console.log(`\t\t${res.status}`);
  }
  const classesList = await jsonfile.
    readFile(__dirname + '/class-names.json') as ClassName[];
  const values = [];
  for (const class0 of classesList) {
    for(let i = 0; i < variants_count; i++) {
      const classType = randomInt(0, 2) == 0 ? ClassType.GROUP : ClassType.PERSONAL;
      values.push(`('${class0.name} #${i+1}','${classType}','${class0.description}')`);
    }
  }
  // eslint-disable-next-line max-len
  const insertionQuery = `insert into classes (name, type, description) values ${values.join(',')};`;
  console.log(`\tInserting ${insertionQuery.length} records into classes table.`);
  const res = await client.query(insertionQuery);
  console.log(`\t\t${res.status}`);
};




export default generateClasses;