/* eslint-disable no-console */
import { connect } from 'ts-postgres';
import parseSqlFile from './../../util/sql-query-parser';
import { DB_CONFIG } from '../../../constants/DBConfig';

const sqlFilePath = `${__dirname}/rooms-table.sql`;
import jsonfile from 'jsonfile';

interface RoomName {
  name: string;
  variants: number;
}

const generateRooms = async () => {
  const baseQueries = parseSqlFile(sqlFilePath);
  await using client = await connect(DB_CONFIG);
  console.log('Rooms table generator.');
  console.log('\tDropping table.');
  for (const query of baseQueries) {
    const res = await client.query(query);
    console.log(`\t\t${res.status}`);
  }
  const roomsNamesList = await jsonfile.
    readFile(__dirname + '/room-names.json') as RoomName[];
  const values = [];
  for (const roomName of roomsNamesList) {
    for(let i = 0; i < roomName.variants; i++) {
      values.push(`('${roomName.name} ${i+1}')`);
    }
  }
  // eslint-disable-next-line max-len
  const insertionQuery = `insert into rooms (name) values ${values.join(',')};`;
  console.log(`\tInserting ${values.length} records into rooms table.`);
  const res = await client.query(insertionQuery);
  console.log(`\t\t${res.status}`);
};




export default generateRooms;