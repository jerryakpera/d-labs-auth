const supertest = require('supertest');

const app = require('../../index');
const request = supertest(app);
const _config = require('../../config');

describe('Tests the express app is up and running', () => {
  it('OK, hitting the API base URL returns "Hello World!"', async (done) => {
    // Sends GET Request to /test endpoint
    const response = await request.post(`${_config.app.baseURL}/`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Hello World!');
    done();
  });
});

describe('Test not found handler', () => {
  it('OK, return 404 error for not found route', async (done) => {
    const response = await request.post(`${_config.app.baseURL}/test`);

    expect(response.status).toBe(404);
    done();
  });
});
