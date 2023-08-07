const Event = require("../../models/event");
const User = require("../../models/user");
const cp = require("../../models/cityPortal");
const { dateToString } = require("../../helpers/date");

const events = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map((event) => {
      return transformEvent(event);
    });
  } catch (err) {
    throw err;
  }
};

const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      createdEvents: events.bind(this, user._doc.createdEvents),
    };
  } catch (err) {
    throw err;
  }
};

const attachUsers = async (portId) => {
  try {
    const userData = await User.find({ cityPortal: portId });
    return userData.map((singleUser) => {
      return {
        ...singleUser._doc,
      };
    });
  } catch (err) {
    throw err;
  }
};

const transformPortal = async (portal) => {
  const p = await cp.findById(portal.id);
  return {
    ...p._doc,
    city: p.city,
    state: p.state,
    users: attachUsers.bind(this, p.id),
  };
};

const singleEvent = async (eventId) => {
  try {
    const event = await Event.findById(eventId);
    return transformEvent(event);
  } catch (err) {
    throw err;
  }
};

const transformEvent = (event) => {
  return {
    ...event._doc,
    date: dateToString(event._doc.date),
    creator: user.bind(this, event.creator),
  };
};

const transformBooking = (booking) => {
  return {
    ...booking._doc,
    user: user.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt),
  };
};

exports.transformBooking = transformBooking;
exports.transformEvent = transformEvent;
exports.transformPortal = transformPortal;
exports.attachUsers = attachUsers;
exports.user = user;