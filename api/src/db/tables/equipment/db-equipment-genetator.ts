/* eslint-disable no-console */
import { connect } from 'ts-postgres';
import parseSqlFile from './../../util/sql-query-parser';
import { DB_CONFIG } from '../../../constants/DBConfig';

const sqlFilePath = `${__dirname}/equipment-table.sql`;
import jsonfile from 'jsonfile';
import { randomInt } from 'crypto';

const generateEquipment = async (variants_count: number) => {
  const baseQueries = parseSqlFile(sqlFilePath);
  await using client = await connect(DB_CONFIG);
  console.log('Equipment table generator.');
  console.log('\tDropping table.');
  for (const query of baseQueries) {
    const res = await client.query(query);
    console.log(`\t\t${res.status}`);
  }
  const equipmentNamesList = await jsonfile.
    readFile(__dirname + '/equipment-names.json') as string[];
  const values = [];
  for (const name of equipmentNamesList) {
    for(let i = 0; i < variants_count; i++) {
      const wear_rate: number = randomInt(0, 5);
      values.push(`('${name} #${i+1}','${wear_rate}')`);
    }
  }
  // eslint-disable-next-line max-len
  const insertionQuery = `insert into equipment (name, wear_rate) values ${values.join(',')};`;
  console.log(`\tInserting ${insertionQuery.length} records into equipment table.`);
  const res = await client.query(insertionQuery);
  console.log(`\t\t${res.status}`);
};




export default generateEquipment;