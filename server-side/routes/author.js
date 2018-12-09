import express from 'express';
import authorController from '../controllers/authorController';

const router = express.Router();

router.get('/authors', (request, response) => {
  authorController.getAll(request, response)
});

router.post('/author', (request, response) => {
  authorController.add(request, response);
});

router.get('/author/:id', (request, response) => {
  authorController.findOne(request, response);
});

router.get('/author/:id/books', (request, response) => {
  authorController.findBooks(request, response);
});

router.put('/author/:id', (request, response) => {
  authorController.update(request, response);
});

router.delete('/author/:id', (request, response) => {
  authorController.delete(request, response);
});

export default router;
