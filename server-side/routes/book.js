import express from 'express';
import bookController from '../controllers/bookController';

const router = express.Router();

router.get('/books', (request, response) => {
  bookController.getAll(request, response)
});

router.post('/book', (request, response) => {
  bookController.add(request, response);
});

router.get('/book/:id', (request, response) => {
  bookController.findOne(request, response);
});

router.get('/book/:id/author', (request, response) => {
  bookController.findAuthor(request, response);
});

router.put('/book/:id', (request, response) => {
  bookController.update(request, response);
});

router.delete('/book/:id', (request, response) => {
  bookController.delete(request, response);
});

export default router;
