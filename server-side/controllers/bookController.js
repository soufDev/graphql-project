import { Types } from 'mongoose';
import Book from '../models/book';
import logger from '../core/logger/app-logger';


const manageError = (response, status, error) => {
  response
    .status(400)
    .json({ error })
    .end();
};

export default class bookController {
  static async getAll(request, response) {
    try {
      const books = await Book.getAll();
      const toJson = books.map(book => book.toJSON());
      logger.info('sending all books');
      response.send({ ...toJson });
    } catch (e) {
      logger.error(e.message);
      const error = e.message;
      manageError(response, 400, error);
    }
  }

  static async add(request, response) {
    try {
      const { book } = request.body;
      const bookToStore = Book({ ...book });
      const err = await bookToStore.validateSync();
      if (err) {
        logger.error(err);
        const { errors } = err;
        manageError(response, 400, errors);
      } else {
        const newBook = await Book.add(bookToStore);
        response.status(201).json({ ...newBook.toJSON() }).end();
      }
    } catch (e) {
      logger.error(e.message);
      const error = e;
      manageError(response, 500, error);
    }
  }

  static async update(request, response) {
    try {
      const { book } = request.body;
      const id = Types.ObjectId(request.params.id);
      const bookToUpdate = Book({ ...book, _id: id });
      const errors = await bookToUpdate.validateSync();
      if (errors) {
        const jsonError = errors.toJSON();
        logger.error({ jsonError });
        manageError(response, 400, { ...jsonError });
      } else {
        await Book.update(id, bookToUpdate);
        response.status(200).json({ book: bookToUpdate.toJSON() }).end();
      }
    } catch (e) {
      logger.error(e);
      manageError(response, 500, ...{ error: e });
    }
  }

  static async findOne(request, response) {
    const id = Types.ObjectId(request.params.id.toLowerCase());
    const book = await Book.get(id);
    response.status(200).json({ book: book.toJSON() }).end();
  }

  static async delete(request, response) {
    const id = Types.ObjectId(request.params.id.toLowerCase());
    await Book.delete(id);
    response.status(204).set('x-code', 'success.delete.book').end();
  }

}
