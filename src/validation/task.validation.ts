import { body, param, query } from 'express-validator';

const validateCreateTask = [
    body("title").isString().withMessage("title must be a string"),
    body("description").isString().withMessage("description must be a string"),
    body("completion_status").isString().optional().withMessage("completion_status must be a string"),
    body("due_date").isDate().withMessage("due_date must be a date"),
];
const validateUpdateTask = [
    body("title").isString().optional(),
    body("description").isString().optional(),
    body("completion_status").isString().optional(),
    body("due_date").isDate().optional(),
    param('id').isUUID().withMessage('ID must be a valid UUID'),
];

const validateGetTask = [
    param('id').isUUID().withMessage('ID must be a valid UUID'),
];
const validateGetTasks = [
    query('page').isInt().optional().withMessage('page must be a number'),
    query('limit').isInt().optional().withMessage('limit must be a number'),
];

export default {
    validateUpdateTask,
    validateGetTasks,
    validateGetTask,
    validateCreateTask
} as const;