
import User from '../models/user.model';
import taskRepo from '@src/repos/taskRepo';
import Task from '@src/models/task.model';


// **** Variables **** //



// **** Functions **** //

/**
 * Get all tasks.
 */
function getAll(userId: string, page?: number, limit?: number): Promise<User[]> {
    return taskRepo.getAll(userId, page, limit);
}

/**
 * Add one task.
 */
function addOne(task: Task): Promise<Task> {
    return taskRepo.add(task);
}


/**
 * find one task.
 */
function finOne(id: string, userId: string): Promise<Task | null> {
    return taskRepo.getOne(id, userId);
}

/**
 * update one task.
*/
function updateOne(id: string, userId: string, task: Omit<Task, "id">): Promise<Task | null> {
    return taskRepo.update(id, userId, task);
}


/**
 * delete one task.
 */
function deleteTask(id: string, userId: string): Promise<Task | null> {
    return taskRepo.deleteTask(id, userId);
}


// **** Export default **** //

export default {
    getAll,
    addOne,
    finOne,
    deleteTask,
    updateOne,


} as const;


