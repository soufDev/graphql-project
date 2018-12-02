import mongoose, { Types } from 'mongoose';
import bookSchema from '../schemas/book';

class Book {
  static getAll() {
    return this.find({});
  }

  static add(book) {
    return book.save();
  }

  static update(_id, book) {
    return this.findByIdAndUpdate(Types.ObjectId(_id), book);
  }

  static deleteAll() {
    return this.remove({});
  }

  static get(id) {
    return this.findOne({ _id: id });
  }

  static delete(id) {
    return this.remove({ _id: id });
  }
}

bookSchema.loadClass(Book);

export default mongoose.model('Book', bookSchema);
