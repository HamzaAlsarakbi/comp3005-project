import { readFileSync } from 'fs';

const parseSqlFile = (absolutePath: string): string[] => {
  const baseQueries = readFileSync(absolutePath, 'utf-8').split(';');

  return baseQueries
    .map(e => `${e.trim()};`
      .replaceAll('\r\n', '')
      .replaceAll('    ', '')
      .replaceAll(';;', ';'))
    .filter(e => e !== '' && e !== ';');
};

export default parseSqlFile;