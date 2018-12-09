import mongoose, { Types } from 'mongoose';
import bookSchema from '../schemas/book';
import Author from './author';

class Book {
  static getAll() {
    return this.find({});
  }

  static async add(book) {
    const storedBook = await book.save();
    const author = await Author.findOne({ _id: storedBook.toJSON().author });
    author.books.push(storedBook.toJSON().id);
    author.save();
    return storedBook;
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
