const events = {};

export default {
  fire(event, params) {
    if (event in events) return events[event](params);
  },
  subscribe(event, cb) {
    if (event in events)
      throw new Error(`event ${event} has already been subscribed`);
    else events[event] = cb;
  },
};
