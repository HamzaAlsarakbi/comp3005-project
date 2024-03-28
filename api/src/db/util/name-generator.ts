/* eslint-disable no-console */
import { randomInt } from 'crypto';
import jsonfile from 'jsonfile';

interface FullNameDB {
  first_name: string;
  last_name: string;
}

const generateNames = async (size: number) => {
  // eslint-disable-next-line max-len
  const names: string[] = await jsonfile.readFile(`${__dirname}/names.json`) as string[];

  const fullNames: FullNameDB[] = [];

  console.log(`Generating ${size} names`);
  for (let i = 0; i < size; i++) {
    const fullName: FullNameDB = { first_name: '', last_name: '' };

    // generate a unique name
    // eslint-disable-next-line no-constant-condition
    while (true) {
      fullName.first_name = names[randomInt(names.length)];
      while (
        fullName.last_name === '' ||
        fullName.last_name === fullName.first_name
      ) {
        fullName.last_name = names[randomInt(names.length)];
      }
      if (!fullNames.includes(fullName)) break;
    }
    fullNames.push(fullName);
  }


  await jsonfile.writeFile(`${__dirname}/fullnames.json`, fullNames);
};

generateNames(1000);