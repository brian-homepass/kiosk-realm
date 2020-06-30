import {ObjectId} from 'bson';

class Checkin {
  constructor({
    name,
    partition,
    mobile,
    email,
    newProperty = new Date().toISOString(),
    checkinDate = new Date(),
    id = new ObjectId(),
  }) {
    this._partition = partition;
    this._id = id;
    this.name = name;
    this.mobile = mobile;
    this.email = email;
    this.checkinDate = checkinDate;
    this.newProperty = newProperty;
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
      newProperty: 'string?',
    },
    primaryKey: '_id',
  };
}

export {Checkin};
