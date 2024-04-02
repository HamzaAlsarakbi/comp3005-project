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
  HealthGoals: {
    Base: '/health-goals',
    All: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
  Payments: {
    Base: '/payments',
    All: '/all/:member_email',
    Add: '/add',
    Process: '/process/:id',
    Cancel: '/cancel/:id',
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
    One: '/:id',
    All: '/all',
    Update: 'update/:id',
  },
  Rooms: {
    Base: '/rooms',
    All: '/all',
  },
} as const;
