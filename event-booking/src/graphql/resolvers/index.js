import { authResolver } from './auth.js';
import { bookingResolver } from './booking.js';
import { eventResolver } from './events.js';

const graphqlResolvers = {
  ...authResolver,
  ...bookingResolver,
  ...eventResolver,
};

export { graphqlResolvers };
