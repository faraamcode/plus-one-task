import RouteError from '@src/common/RouteError';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import UserRepo from '@src/repos/UserRepo';
import { IUser } from '@src/models/User';
import User from '../models/user.model';


// **** Variables **** //

export const USER_NOT_FOUND_ERR = 'User not found';


// **** Functions **** //

/**
 * Get all users.
 */
function getAll(): Promise<User[]> {
  return UserRepo.getAll();
}

/**
 * Add one user.
 */
function addOne(user: User): Promise<User> {
  return UserRepo.add(user);
}


/**
 * Add one user.
 */
function finOne(email: string): Promise<User | null> {
  return UserRepo.getOne(email);
}













// **** Export default **** //

export default {
  getAll,
  addOne,
  finOne

} as const;
