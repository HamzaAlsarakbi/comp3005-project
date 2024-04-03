/**
 * Express router paths
 */
export default {
  Base: '/api',
  Members: {
    Base: '/members',
    All: '/all',
    AllByBooking: '/booking/:id',
    Enroll: '/booking/enroll/:id',
    Leave: '/booking/leave/:id',
    IsEnrolled: '/booking/is-enrolled/:id',
    Conflicts: '/booking/conflicts/:id',
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
  Routines: {
    Base: '/routines',
    All: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
  Trainers: {
    Base: '/trainers',
    One: '/:email',
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
  Bookings: {
    Base: '/bookings',
    All: '/all',
    Add: '/add',
    One: '/:id',
    AllByClass: '/class/:id',
    AllByRoom: '/room/:id',
    Update: '/update',
    Cancel: '/cancel/:id',
  },
  Equipment: {
    Base: '/equipment',
    One: '/:id',
    All: '/all',
    Update: '/update',
  },
  Rooms: {
    Base: '/rooms',
    All: '/all',
  },
} as const;
