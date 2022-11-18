import { Event } from '../../models/event.model.js';
import { Booking } from '../../models/booking.model.js';
import { transformBooking, transformEvent } from './merge.js';

const bookingResolver = {
  bookings: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error('Unauthenticated!');
      }

      const bookings = await Booking.find({ user: req.userId });

      return bookings.map((booking) => {
        return transformBooking(booking);
      });
    } catch (err) {
      throw err;
    }
  },

  bookEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    const event = await Event.findOne({ _id: args.eventId });
    let user = req.userId;

    const booking = new Booking({
      event,
      user,
    });

    const result = await booking.save();
    return transformBooking(result);
  },

  cancelBooking: async (args) => {
    try {
      if (!req.isAuth) {
        throw new Error('Unauthenticated!');
      }
      const booking = await Booking.findById(args.bookingId).populate('event');

      const event = transformEvent(booking.event);
      await Booking.deleteOne({ _id: args.bookingId });

      return event;
    } catch (err) {
      throw err;
    }
  },
};

export { bookingResolver };
