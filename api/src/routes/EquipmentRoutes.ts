import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import EquipmentService from '@src/services/EquipmentService';
import { IReq, IRes } from './types/express/misc';
import { UEquipment } from '@src/models/Equipment';


async function getAll(_: IReq, res: IRes) {
  const equipment = await EquipmentService.getAll();
  return res.status(HttpStatusCodes.OK).json({ equipment });
}

const getOne = async (req: IReq, res: IRes) => {
  const id = Number(req.params.id);
  if(isNaN(id)) return res.status(HttpStatusCodes.BAD_REQUEST).json({
    error: 'ID parameter supplied is not a number.',
  });
  const e = await EquipmentService.getOne(Number(id));
  if(e)  return res.status(HttpStatusCodes.OK).json(e);
  return res.status(HttpStatusCodes.NOT_FOUND).json({
    error: 'Equipment not found with the provided ID',
  });
};


async function update(req: IReq<{ equipment: UEquipment }>, res: IRes) {
  const { equipment: equipment } = req.body;
  await EquipmentService.updateOne(equipment);
  return res.status(HttpStatusCodes.OK).json({ message: 'Equipment updated.' });
}

export default {
  getAll,
  getOne,
  update,
} as const;