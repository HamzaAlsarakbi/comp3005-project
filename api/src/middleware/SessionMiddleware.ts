import { NextFunction } from 'express';
import { UserRole, ISessionUser } from '@src/models/Session';
import { IReq, IRes } from '@src/routes/types/types';

/**
 * Validates a user's session, redirects to login page if authentication fails
 * @param req the request
 * @param res the response
 * @param next next response
 */
const validateUserSession = (req: IReq, res: IRes, next: NextFunction) => {
  const session = req.session as ISessionUser;
  if (session && session.user) {
    next();
  } else {
    res.status(401).send();
  }
};

/**
 * Validates member's session, sends "403 Forbidden" if validation fails
 * @param req the request
 * @param res the response
 * @param next next response
 */
const validateMemberSession = (req: IReq, res: IRes, next: NextFunction) => {
  _validateSession(req, res, next, UserRole.MEMBER);
};

/**
 * Validates admin's session, sends "403 Forbidden" if validation fails
 * @param req the request
 * @param res the response
 * @param next next response
 */
const validateAdminSession = (req: IReq, res: IRes, next: NextFunction) => {
  _validateSession(req, res, next, UserRole.ADMIN);
};

/**
 * Validates trainer's session, sends "403 Forbidden" if validation fails
 * @param req the request
 * @param res the response
 * @param next next response
 */
const validateTrainerSession = (req: IReq, res: IRes, next: NextFunction) => {
  _validateSession(req, res, next, UserRole.TRAINER);
};

const _validateSession = (
  req: IReq,
  res: IRes,
  next: NextFunction,
  role: UserRole) => {
  const session = req.session as ISessionUser;
  if (session && session.user && session.user.role == role) {
    next();
  } else {
    res.status(403).send();
  }
};

export default {
  validateUserSession,
  validateMemberSession,
  validateAdminSession,
  validateTrainerSession,
} as const;