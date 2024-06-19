import { body, param, query } from 'express-validator';

const validateCreateUser = [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("name").isString().withMessage("name must be a string"),
    body("password").isString().withMessage("password must be a string"),
];
const validateLogin = [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password").isString().withMessage("password must be a string"),
];

export default {
    validateCreateUser,
    validateLogin
} as const;