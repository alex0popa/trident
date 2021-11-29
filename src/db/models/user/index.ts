import { Model, model, Schema } from 'mongoose';

import bcrypt from 'bcryptjs';

import { User } from './types';

const UserSchema = new Schema<User, Model<User, User>>({
  name: {
    type: String,
    required: [true, 'Please provide a name...'],
  },
  lastName: {
    type: String,
    required: [true, 'Please provide your last name...'],
    select: false // not return the field when query a User
  },
  email: {
    type: String,
    required: [true, 'Please provide a email...'],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w{2}([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email...'
    ],
    select: false
  },
  password: {
    type: String,
    required: [true, 'Please provide a password...'],
    minlength: 6,
    select: false
  },
  birthDate: {
    type: Date,
    required: [true, 'Please provide the birthdate...'],
    select: false
  }
});

UserSchema.pre('save', async function (next) {
  !this.isModified('password') && next();

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

UserSchema.methods.matchPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export const UserModel = model('User', UserSchema);
