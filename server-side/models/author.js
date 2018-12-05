import mongoose, { Types } from 'mongoose';
import authorSchema from '../schemas/author';

class Author {
  static getAll() {
    return this.find({});
  }

  static add(author) {
    return author.save();
  }

  static update(_id, author) {
    return this.findByIdAndUpdate(Types.ObjectId(_id), author);
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

authorSchema.loadClass(Author);

export default mongoose.model('Author', authorSchema);
