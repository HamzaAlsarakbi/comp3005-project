/**
 * Express router paths
 */
export default {
  Base: '/api',
  Members: {
    Base: '/members',
    Get: '/all',
    One: '/:email',
    Add: '/add',
    Update: '/update',
  },
  Sessions: {
    Base: '/sessions',
    Get: '/check',
  },
  Login: {
    Base: '/logins',
    Add: '/login',
    Delete: '/logout',
  },
  Classes: {
    Base: '/classes',
    Get: '/all',
    Add: '/add',
    Update: '/update/:id',
    Delete: '/delete/:id',
  },
} as const;
