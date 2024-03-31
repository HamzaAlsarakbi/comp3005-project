import { postgresQuery } from '@src/db/postgres-helpers';
import { IEquipment, UEquipment } from '@src/models/Equipment';
import { toSQLDate } from '@src/util/misc';

/**
 * gets all equipment
 * @returns all equipment
 */
const getAll = async(): Promise<IEquipment[]> => {
  const equipment = await postgresQuery<IEquipment>('select * from equipment');
  return equipment;
};

/**
 * gets all equipment
 * @returns all equipment
 */
const updateOne = async(e: UEquipment): Promise<UEquipment[]> => {
  const equipment = await postgresQuery<UEquipment>(`
  update equipment
  set
    ${e.name ?          `name           ='${e.name}',` : ''}
    ${e.condition ?     `condition      =${e.condition},`   : ''}
    ${e.last_checkup ?  `last_checkup   =${toSQLDate(e.last_checkup)},`   : ''}
  where equipment_id='${e.equipment_id}';
  `);
  return equipment;
};


export default {
  getAll,
  updateOne,
} as const;