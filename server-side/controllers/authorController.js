import { Types } from 'mongoose';
import { manageError } from './bookController';
import Author from '../models/author';
import logger from '../core/logger/app-logger';

export default class authorController {
  static async getAll(request, response) {
    try {
      const authors = await Author.getAll();
      const toJson = authors.map(author => author.toJSON());
      logger.info('sending all authors');
      response.send(toJson);
    } catch (e) {
      logger.error(e.message);
      const error = e.message;
      manageError(response, 400, error);
    }
  }

  static async add(request, response) {
    try {
      const { author } = request.body;
      const authorToStore = Author({ ...author });
      const err = await authorToStore.validateSync();
      if (err) {
        logger.error(err);
        const { errors } = err;
        manageError(response, 400, errors);
      } else {
        const newAuthor = await Author.add(authorToStore);
        response.status(201).json({ ...newAuthor.toJSON() }).end();
      }
    } catch (e) {
      logger.error(e.message);
      manageError(response, 500, { error: e });
    }
  }

  static async update(request, response) {
    try {
      const { author } = request.body;
      const id = Types.ObjectId(request.params.id);
      const authorToUpdate = Author({ ...author, _id: id });
      const errors = await authorToUpdate.validateSync();
      if (errors) {
        const jsonError = errors.toJSON();
        logger.error({ jsonError });
        manageError(response, 400, { ...jsonError });
      } else {
        await Author.update(id, authorToUpdate);
        response.status(200).json({ author: authorToUpdate.toJSON() }).end();
      }
    } catch (e) {
      logger.error(e);
      manageError(response, 500, ...{ error: e });
    }
  }

  static async findOne(request, response) {
    const id = Types.ObjectId(request.params.id.toLowerCase());
    const author = await Author.get(id);
    response.status(200).json({ author: author.toJSON() }).end();
  }

  static async delete(request, response) {
    const id = Types.ObjectId(request.params.id.toLowerCase());
    await Author.delete(id);
    response.status(204).set('x-code', 'success.delete.author').end();
  }

}
