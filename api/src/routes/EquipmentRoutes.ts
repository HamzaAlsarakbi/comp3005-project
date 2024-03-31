import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import EquipmentService from '@src/services/EquipmentService';
import { IReq, IRes } from './types/express/misc';
import { IEquipment } from '@src/models/Equipment';


async function getAll(_: IReq, res: IRes) {
  const equipment = await EquipmentService.getAll();
  return res.status(HttpStatusCodes.OK).json({ equipment });
}


async function update(req: IReq<{ equipment: IEquipment }>, res: IRes) {
  const { equipment: equipment } = req.body;
  await EquipmentService.updateOne(equipment);
  return res.status(HttpStatusCodes.OK).end();
}

export default {
  getAll,
  update,
} as const;