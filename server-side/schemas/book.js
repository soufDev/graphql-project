import { Schema, Types } from 'mongoose';
import { options } from './author';

const bookSchema = new Schema({
  title: String,
  description: String,
  page: Number,
  author: {
    type: Types.ObjectId,
    ref: 'Author'
  }
}, options);

export default bookSchema;
