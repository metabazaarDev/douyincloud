import request from 'supertest';
// const app = require('./app');
// import    from 'supertest';
import app from '../server';

describe('GET /', () => {
  it('should return Ping Success!', async () => {
    const response = await request(app.callback()).get('/v1/ping');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Ping Success');
  });
});
