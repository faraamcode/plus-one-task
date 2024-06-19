import { Router } from 'express';
import jetValidator from 'jet-validator';

import Paths from '../common/Paths';
import UserRoutes from './UserRoutes';
import TaskRoute from './TaskRoute';
import verifyAuthToken from '@src/middleware/auth.middleware';
import taskValidation from '@src/validation/task.validation';
import validationResultMiddleware from '@src/middleware/valittion.middleware';
import userValidation from '@src/validation/user.validation';


// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator();


// ** Add UserRouter ** //

const userRouter = Router();
const taskRouter = Router()



// Add one user
userRouter.post(
  Paths.Users.Add,
  userValidation.validateCreateUser,
  validationResultMiddleware,
  UserRoutes.add,
);


// Login user
userRouter.post(
  Paths.Users.login,
  userValidation.validateLogin,
  validationResultMiddleware,
  UserRoutes.login,
);


// Create task
taskRouter.post(
  Paths.Tasks.absolute,
  verifyAuthToken,
  taskValidation.validateCreateTask,
  validationResultMiddleware,
  TaskRoute.add,
);

// Create task
taskRouter.get(
  Paths.Tasks.absolute,
  verifyAuthToken,

  taskValidation.validateGetTasks,
  validationResultMiddleware,
  TaskRoute.getTasks,
);
// update task
taskRouter.put(
  Paths.Tasks.task,
  verifyAuthToken,
  taskValidation.validateUpdateTask,
  validationResultMiddleware,
  TaskRoute.update,
);

// single task
taskRouter.get(
  Paths.Tasks.task,
  verifyAuthToken,
  taskValidation.validateGetTask,
  validationResultMiddleware,

  TaskRoute.getOne,
);


// delete task
taskRouter.delete(
  Paths.Tasks.task,
  verifyAuthToken,
  taskValidation.validateGetTask,
  validationResultMiddleware,
  // validate(['user', User.isUser]),
  TaskRoute.deleteTask,
);



// Add UserRouter
apiRouter.use(Paths.Users.Base, userRouter);
apiRouter.use(Paths.Tasks.Base, taskRouter);


// **** Export default **** //

export default apiRouter;
