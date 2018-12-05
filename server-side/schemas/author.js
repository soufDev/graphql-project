import { Schema, Types } from 'mongoose';

const transform = (doc, ret) => {
  const clonedRet = ret.clone();
  clonedRet.id = clonedRet._id;
  delete clonedRet._id;
  delete clonedRet.__v;
  return clonedRet;
};

export const options = {
  toObject: {
    transform: (doc, ret) => transform(doc, ret)
  },
  toJSON: {
    virtuals: true,
    versionKey: false,
    getters: true,
    transform: (doc, ret) => transform(doc, ret)
  }
};

const authorSchema = new Schema({
  name: {
    first: String,
    last: String
  },
  age: Number
}, options);

export default authorSchema;
