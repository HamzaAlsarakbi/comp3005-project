import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import { IReq, IRes } from './types/express/misc';



function post(req: IReq, res: IRes) {
  
  return res.status(HttpStatusCodes.OK).json({ });
}



// **** Export default **** //

export default {
  post,
} as const;
