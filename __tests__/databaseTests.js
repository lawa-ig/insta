/* You'll need to have PostgreSQL running for these tests to pass. 
 * 
 * Use this reference page for 'matcher' syntax
 * https://facebook.github.io/jest/docs/en/expect.html
*/


var db = require('../database/index.js');

// Opens connection to lawa_db database. This won't work in travisCI
const pg = require('pg');
const connection = process.env.DATABASE_URL ?
  { connectionString: process.env.DATABASE_URL } :
  { host: 'localhost', database: 'lawa_db' };
const pool = new pg.Pool(connection);

beforeAll(() => {
  pool.connect();
});

afterAll(() => {
  pool.end();
});

describe('getUsersFollowing', () => {
  test('to return a promise that resolves', () => {
    return expect(db.getUsersFollowing(1)).resolves.toBeDefined();
  });
  test('returns rows of results', () => {
    return expect(db.getUsersFollowing(1)).resolves.toHaveProperty('rows');
  });
  test('rejects a userId that is not a number', () => {
    return expect(db.getUsersFollowing('not a number')).rejects.toThrow();
  });
});
