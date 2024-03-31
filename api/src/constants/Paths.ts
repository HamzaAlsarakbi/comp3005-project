/**
 * Express router paths
 */
export default {
  Base: '/api',
  Members: {
    Base: '/members',
    All: '/all',
    One: '/:email',
    Add: '/add',
    Update: '/update',
  },
  Trainers: {
    Base: '/trainers',
    All: '/all',
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
    All: '/all',
    Add: '/add',
    Update: '/update/:id',
    Delete: '/delete/:id',
  },
  Equipment: {
    Base: '/equipment',
    All: '/all',
    Update: 'update/:id',
  },
  Rooms: {
    Base: '/rooms',
    All: '/all',
  },
} as const;
