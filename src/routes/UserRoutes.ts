import HttpStatusCodes from '@src/common/HttpStatusCodes';

import UserService from '@src/services/UserService';
import { IUser } from '@src/models/User';
import { IReq, IRes } from './types/express/misc';
import User from '../models/user.model';
import { verifyPassword } from '../util/encrypt';
import { generateToken } from '@src/util/jwt';




/**
 * Add one user.
*/

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - password
 *               - email 
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: The user was successfully created
 *       500:
 *         description: Some server error
 */
async function add(req: IReq<any>, res: IRes) {
  console.log(req.body)
  const user = await UserService.addOne(req.body);
  if (user) {
    return res.status(HttpStatusCodes.CREATED).json({
      message: "user created successfully",
    });
  }

  return res.status(HttpStatusCodes.BAD_GATEWAY).json({
    message: "something went wrong",
  });
}

/**
 * Login  user.
*/


/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User login route
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email 
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Logged in successfully
 *       500:
 *         description: Some server error
 */
async function login(req: IReq<any>, res: IRes) {
  const { email, password } = req.body;
  const ifExist = await UserService.finOne(email)

  if (ifExist) {
    const checkPassword = await verifyPassword(password, ifExist?.password)
    if (checkPassword) {
      const { id, email } = ifExist
      const token = generateToken({ id, email })
      return res.status(HttpStatusCodes.OK).json({ message: "logged in succesfully", user: { id, email }, token });
    } else {

      return res.status(HttpStatusCodes.UNAUTHORIZED).end()
    }
  } else {
    return res.status(HttpStatusCodes.UNAUTHORIZED).end()
  }
}



// **** Export default **** //

export default {
  add,
  login,

} as const;
