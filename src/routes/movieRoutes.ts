import express from 'express';
import * as movieController from '../controller/movieController';

const router = express.Router();

router.get('/', movieController.getAllMovies);
router.get('/search', movieController.searchMovies);
router.post('/', movieController.addMovie);
router.put('/:id', movieController.updateMovie);
router.delete('/:id', movieController.deleteMovie);

export default router;