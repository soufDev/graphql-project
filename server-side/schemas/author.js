import { Schema, Types } from 'mongoose';

const transform = (doc, ret) => {
  const clonedRet = { ...ret };
  clonedRet.id = ret._id;
  delete clonedRet._id;
  delete clonedRet.__v;
  return clonedRet;
};

export const options = {
  toObject: {
    virtuals: true,
    versionKey: false,
    getters: true,
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
  age: Number,
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
}, options);

export default authorSchema;
