const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../src/app');
const { connect } = require('../../src/utils/mongoose');
const User = require('../../src/models/User');

describe('GET /', () => {
  beforeEach(async () => {
    await connect();
  });

  it('query validation error', (done) => {
    request(app)
      .get('/')
      .query({})
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((response) => {
        const { statusCode, body } = response;
        const { error } = body;

        assert.strictEqual(statusCode, 400);
        assert.strictEqual(error, 'lat is required');
      })
      .end(() => done());
  });

  it('No user found in that location', (done) => {
    request(app)
      .get('/')
      .query({
        lat: 28.68932908896041,
        long: 77.44562543869382,
        distance: 220,
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((response) => {
        const { statusCode, body } = response;
        assert.deepEqual(body, []);
        assert.strictEqual(statusCode, 200);
      })
      .end(() => done());
  });

  it('Users found within the location', async () => {
    const USERS = [
      {
        username: 'takshch',
        location: { type: 'Point', coordinates: [77.44650035653297, 28.68920128745865] }
      },
      {
        username: 'sumitk',
        location: { type: 'Point', coordinates: [77.4461945847786, 28.68896599399382] }
      },
      {
        username: 'ninjahatori',
        location: { type: 'Point', coordinates: [77.4461945847786, 28.68896599399382] }
      }
    ];

    await User.insertMany(USERS);
    await User.createIndexes();

    await request(app)
      .get('/')
      .query({
        lat: 28.68932908896041,
        long: 77.44562543869382,
        distance: 69,
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((response) => {
        const { statusCode, body } = response;

        assert.strictEqual(statusCode, 200);
        assert.deepEqual(body[0].username, 'sumitk');
        assert.deepEqual(body[1].username, 'ninjahatori');
      });
  });

  afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });
});