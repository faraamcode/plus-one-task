/**
 * Express router paths go here.
 */


export default {
  Base: '/api',
  Users: {
    Base: '/users',
    login: '/login',
    Add: '/signup',

  },
  Tasks: {
    Base: '/tasks',
    task: '/:id',
    absolute: '/',
    add: '/task',

  },
} as const;
