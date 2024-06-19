// **** Functions **** //

import Task from "@src/models/task.model";

/**
 * Get one task.
 */
async function getOne(id: string, userId: string): Promise<Task | null> {
    const task = await Task.findOne({ where: { id, userId } });
    return task ? task : null;
}

/**
 * Get all task.
 */
async function getAll(userId: string, page?: number, limit?: number): Promise<any> {
    const tasks = await Task.findAll({
        where: { userId, },
        limit: limit || 10,
        offset: page && limit ? (page - 1) * limit : 0
    });
    return tasks;
}

/**
 * Add one task.
 */
async function add(task: any): Promise<Task> {
    const saved = await Task.create(task);

    return await saved.save();
}
/**
 * Update one task.
 */
async function update(id: string, userId: string, task: any): Promise<any> {
    const updated = await Task.update(task, { where: { id, userId } });
    return updated;
}
/**
 * delete one user.
 */
async function deleteTask(id: string, userId: string): Promise<any> {
    const updated = await Task.destroy({ where: { id, userId } });
    return updated;
}




// **** Export default **** //

export default {
    getOne,
    getAll,
    add,
    update,
    deleteTask
} as const;
