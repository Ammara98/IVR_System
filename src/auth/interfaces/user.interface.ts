import * as mongoose from 'mongoose';

export interface UserInterface extends mongoose.Document {
  _id: mongoose.ObjectId; 
  username: string;
  password: string;
  createdAt: mongoose.Date;
  updatedAt: mongoose.Date;
}
