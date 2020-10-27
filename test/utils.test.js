const { ExpectationFailed } = require('http-errors');
const _ = require('../utils/utils');

describe('Testing util functions', () => {
  it('verifyRequestBody should return true if obj properties and properties of arr have same values', () => {
    const testObj = {
      name: 'John Doe',
      age: 23,
    };
    expect(_.verifyRequestBody(testObj, ['name', 'age'])).toBe(true);
  });
});
