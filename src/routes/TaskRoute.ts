import HttpStatusCodes from '@src/common/HttpStatusCodes';

import UserService from '@src/services/UserService';
import { IUser } from '@src/models/User';
import { IReq, IRes } from './types/express/misc';
import User from '../models/user.model';
import { verifyPassword } from '../util/encrypt';
import { generateToken } from '@src/util/jwt';
import taskService from '@src/services/taskService';




/**
 * Add one task.
*/

/**
 * @swagger
 * tags:
 *   name: task
 *   description: Task CRUD
 * components:
 *   schemas:
 *     TaskStatus:
 *       type: enum
 *       enum:
 *         - PENDING
 *         - IN_PROGRESS
 *         - COMPLETED
 *       example: PENDING | IN_PROGRESS | COMPLETED
 */

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [task]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - due_date 
 *               - completion_status 
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completion_status:
 *                 $ref: '#/components/schemas/TaskStatus'
 *               due_date:
 *                 type: string
 *                 format: date
 *                 example: "2000-01-01"
 *     responses:
 *       201:
 *         description: The user was successfully created
 *       500:
 *         description: Some server error
 */
async function add(req: IReq<any>, res: IRes) {
    const task = await taskService.addOne({ ...req.body, userId: req?.user?.id });
    return res.status(HttpStatusCodes.CREATED).json({
        message: "task  created successfully",
        task: task
    });
}


/**
 * Update one task.
*/

/**
 * @swagger
 * tags:
 *   name: task
 *   description: Task CRUD
 * components:
 *   schemas:
 *     TaskStatus:
 *       type: enum
 *       enum:
 *         - PENDING
 *         - IN_PROGRESS
 *         - COMPLETED
 *       example: PENDING | IN_PROGRESS | COMPLETED
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: update a new task
 *     tags: [task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - due_date 
 *               - completion_status 
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completion_status:
 *                 $ref: '#/components/schemas/TaskStatus'
 *               due_date:
 *                 type: string
 *                 format: date
 *                 example: "2000-01-01"
 *     responses:
 *       200:
 *         description: The user was successfully updated
 *       500:
 *         description: Some server error
 */
async function update(req: IReq<any>, res: IRes) {
    const { id } = req.params
    const task = await taskService.updateOne(id, req?.user?.id, req.body);
    return res.status(HttpStatusCodes.OK).json({
        message: "task  updated successfully",
        task: task
    });
}


/**
 * Update one task.
*/

/**
 * @swagger
 * tags:
 *   name: task
 *   description: Task CRUD
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: delete a new task
 *     tags: [task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     responses:
 *       200:
 *         description: The user was deleted 
 *       500:
 *         description: Some server error
 */
async function deleteTask(req: IReq<any>, res: IRes) {
    const { id } = req.params
    const task = await taskService.deleteTask(id, req?.user?.id);
    return res.status(HttpStatusCodes.OK).json({
        message: "task  deleted successfully",
        task: task
    });
}



/**
 * @swagger
 * tags:
 *   name: task
 *   description: Task CRUD
 */


/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: get a single task
 *     tags: [task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     responses:
 *       200:
 *         description: task  fetched successfully
 *       500:
 *         description: Some server error
 */
async function getOne(req: IReq<any>, res: IRes) {
    const { id } = req.params
    const task = await taskService.finOne(id, req?.user?.id);
    return res.status(HttpStatusCodes.OK).json({
        message: "task  fetched successfully",
        task: task
    });
}




/**
 * @swagger
 * tags:
 *   name: task
 *   description: Task CRUD
 */
/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: get  tasks
 *     tags: [task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: number
 *         description: page number 
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: number
 *         description: page limit
 *     responses:
 *       200:
 *         description: tasks fetched successfully
 *       500:
 *         description: Some server error
 */
async function getTasks(req: IReq<any>, res: IRes) {
    const { page = 0, limit = 10 } = req.query
    const task = await taskService.getAll(req?.user?.id, +page, +limit);
    return res.status(HttpStatusCodes.OK).json({
        message: "tasks  fetched successfully",
        task: task
    });
}




// **** Export default **** //

export default {
    add,
    getOne,
    getTasks,
    update,
    deleteTask

} as const;
