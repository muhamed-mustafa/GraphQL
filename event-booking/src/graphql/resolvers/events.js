import { Event } from '../../models/event.model.js';
import { transformEvent } from './merge.js';
import { User } from '../../models/user.model.js';

const eventResolver = {
  events: async () => {
    try {
      let events = await Event.find({});

      return (events = events.map((event) => {
        return transformEvent(event);
      }));
    } catch (err) {
      throw err;
    }
  },

  craeteEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }

    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: req.userId,
    });

    const creator = await User.findById(req.userId);
    if (!creator) {
      throw new Error('User not found');
    }

    let createdEvent;
    const result = await event.save();
    createdEvent = transformEvent(result);

    creator.createdEvents.push(event);
    await creator.save();

    return createdEvent;
  },
};

export { eventResolver };
