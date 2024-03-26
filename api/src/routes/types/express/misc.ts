import * as e from 'express';

import { ISessionUser } from '@src/models/Member';
// import { UserSession } from '@src/models/Session';


// **** Express **** //

export interface IReq<T = void> extends e.Request {
  // session: UserSession;
  body: T;
}

export interface IRes extends e.Response {
  locals: {
    sessionUser?: ISessionUser;
  };
}