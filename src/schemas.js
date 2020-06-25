import {ObjectId} from 'bson';

class Checkin {
  constructor({
    name,
    partition,
    mobile,
    email,
    checkinDate = new Date(),
    id = new ObjectId(),
  }) {
    this._partition = partition;
    this._id = id;
    this.name = name;
    this.mobile = mobile;
    this.email = email;
    this.checkinDate = checkinDate;
  }

  static schema = {
    name: 'Checkin',
    properties: {
      _id: 'objectId',
      _partition: 'string',
      name: 'string',
      mobile: 'string?',
      email: 'string?',
      checkinDate: 'date?',
      userId: 'string?',
    },
    primaryKey: '_id',
  };
}

export {Checkin};
