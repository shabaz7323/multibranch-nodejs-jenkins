const request = require('supertest');
const express = require('express');
const app = express();
app.get('/', (req, res) => res.json({ message: 'Hello from multibranch Node.js sample!' }));

describe('GET /', () => {
  it('responds with json', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
  });
});
