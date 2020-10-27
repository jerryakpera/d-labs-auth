const supertest = require('supertest');

const app = require('../../index');
const request = supertest(app);
const _config = require('../../config');

describe('Testing /register/user request', () => {
  const registerURL = `${_config.app.baseURL}/register/user`;

  it('Return 400 if name is < 6 characters', async (done) => {
    const response = await request.post(registerURL).send({
      name: 'John',
      email: 'jdoe@gmail.com',
      password: 'password1234',
      confirmpassword: 'password1234',
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Name must be 6 characters',
        }),
      ])
    );
    done();
  });

  it('Return 400 if email is invalid', async (done) => {
    const response = await request.post(registerURL).send({
      name: 'John',
      email: 'jdoe@gmail',
      password: 'password1234',
      confirmpassword: 'password1234',
    });

    console.log(response.body.errors);

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          email: 'Email is invalid',
        }),
      ])
    );
    done();
  });

  it('Return 400 if password is < 8', async (done) => {
    const response = await request.post(registerURL).send({
      name: 'John',
      email: 'jdoe@gmail',
      password: 'passwor',
      confirmpassword: 'passwor',
    });

    console.log(response.body.errors);

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          password: 'Password must be longer than 8 characters',
        }),
      ])
    );
    done();
  });

  it('Return 400 if password starts with a number', async (done) => {
    const response = await request.post(registerURL).send({
      name: 'John',
      email: 'jdoe@gmail',
      password: '4passwor',
      confirmpassword: '4passwor',
    });

    console.log(response.body.errors);

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          password: 'Password must start with a letter',
        }),
      ])
    );
    done();
  });

  it('Return 400 if passwords do not match', async (done) => {
    const response = await request.post(registerURL).send({
      name: 'John',
      email: 'jdoe@gmail',
      password: 'password',
      confirmpassword: '4passwor',
    });

    console.log(response.body.errors);

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          password: 'Passwords must match',
        }),
      ])
    );
    done();
  });
});
