import { Request, Response } from 'express';
import Movie from '../models/movieModel';

export const getAllMovies = async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err:any) {
    res.status(500).json({ message: err.message });
  }
};

export const searchMovies = async (req: Request, res: Response) => {
  const { q } = req.query;
  try {
    const movies = await Movie.find({
      $or: [{ title: { $regex: q, $options: 'i' } }, { genre: { $regex: q, $options: 'i' } }],
    });
    res.json(movies);
  } catch (err:any) {
    res.status(500).json({ message: err.message });
  }
};

export const addMovie = async (req: Request, res: Response) => {
  const movie = new Movie(req.body);
  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (err:any) {
    res.status(400).json({ message: err.message });
  }
};

export const updateMovie = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedMovie);
  } catch (err:any) {
    res.status(404).json({ message: 'Movie not found' });
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Movie.findByIdAndDelete(id);
    res.json({ message: 'Movie deleted' });
  } catch (err) {
    res.status(404).json({ message: 'Movie not found' });
  }
};
