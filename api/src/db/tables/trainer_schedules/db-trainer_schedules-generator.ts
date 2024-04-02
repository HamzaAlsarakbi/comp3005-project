/* eslint-disable no-console */
import { connect } from 'ts-postgres';
import parseSqlFile from '../../util/sql-query-parser';
import { DB_CONFIG } from '../../../constants/DBConfig';

const sqlFilePath = `${__dirname}/trainer_schedules-table.sql`;


const generateTrainerSchedules = async (size: number) => {
  const baseQueries = parseSqlFile(sqlFilePath);
  await using client = await connect(DB_CONFIG);
  console.log('trainer_schedules table generator.');
  console.log('\tDropping table.');
  for (const query of baseQueries) {
    const res = await client.query(query);
    console.log(`\t\t${res.status}`);
  }
  // const values = [];
  // for(let i = 0; i < size; i++) {
  //   values.push(`('${roomName.name} ${i+1}')`);
  // }
  // const insertionQuery = `insert into trainer_schedules (name) values ${values.join(',')};`;
  // console.log(`\tInserting ${values.length} records into trainer_schedules table.`);
  // const res = await client.query(insertionQuery);
  // console.log(`\t\t${res.status}`);
};




export default generateTrainerSchedules;