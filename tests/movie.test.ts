import request from 'supertest';
import app from '../src/index';


describe('Movie API Endpoints', () => {
  let movieId = '';

  it('should create a new movie', async () => {
    const res = await request(app)
      .post('/movies')
      .send({
        title: 'Test Movie',
        genre: 'Test Genre',
        rating: 5,
        streamingLink: 'https://abc.com',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    movieId = res.body._id;
  });

  it('should get all movies', async () => {
    const res = await request(app).get('/movies');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should search movies by title', async () => {
    const res = await request(app).get('/movies/search?q=Test');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should update the movie', async () => {
    const res = await request(app)
      .put(`/movies/${movieId}`)
      .send({
        title: 'Updated Test Movie',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toEqual('Updated Test Movie');
  });

  it('should delete the movie', async () => {
    const res = await request(app).delete(`/movies/${movieId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Movie deleted');
  });
});