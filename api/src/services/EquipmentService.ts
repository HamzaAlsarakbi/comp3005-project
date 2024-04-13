import { postgresQuery } from '@src/db/postgres-helpers';
import { IEquipment, UEquipment } from '@src/models/Equipment';

/**
 * gets all equipment
 * @returns all equipment
 */
const getAll = async (): Promise<IEquipment[]> => {
  const equipment = await postgresQuery<IEquipment>('select * from equipment');
  return equipment;
};


/**
 * Gets one equipment by id
 * @param id id of the equipment
 * @returns the equipment if there is one with the provided id, otherwise null.
 */
const getOne = async (id: number): Promise<IEquipment | null> => {
  const equipment = await postgresQuery<IEquipment>(
    `select * from equipment where equipment_id='${id}'`);

  return equipment.length == 0 ? null : equipment[0];
};

/**
 * gets all equipment
 * @returns all equipment
 */
const updateOne = async (e: UEquipment): Promise<UEquipment[]> => {
  const equipment = await postgresQuery<UEquipment>(
    `update equipment set condition=${e.condition}
      where equipment_id=${e.equipment_id}`,
  );
  return equipment;
};


export default {
  getAll,
  getOne,
  updateOne,
} as const;