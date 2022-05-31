import * as mongoose from 'mongoose';

export interface UserInterface extends mongoose.Document {
  _id: mongoose.ObjectId; //changed from number
  username: string;
  password: string;
  createdAt: mongoose.Date;
  updatedAt: mongoose.Date;
}
