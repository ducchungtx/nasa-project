const request = require('supertest');
const app = require('../../app');
const { mongoConnect, mongoDisconnect } = require('../../services/mongo');

describe('Launches API', () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  // disconnect from mongoDB
  afterAll(async () => {
    await mongoDisconnect();
  });

  describe('Test GET /launches', () => {
    test('It should response with 200 success', async () => {
      const response = await request(app)
        .get('/launches')
        .expect(200)
        .expect('Content-Type', /json/);
    })
  });

  describe('Test POST /launch', () => {
    const completeLaunchDate = {
      mission: 'USS Enterprise',
      rocket: 'SpaceX Falcon 9',
      target: 'Kepler-62 f',
      launchDate: 'January 4, 2028',
    };

    const launchDataWithoutDate = {
      mission: 'USS Enterprise',
      rocket: 'SpaceX Falcon 9',
      target: 'Kepler-62 f',
    };

    const launchDataWithInvalidDate = {
      mission: 'USS Enterprise',
      rocket: 'SpaceX Falcon 9',
      target: 'Kepler-62 f',
      launchDate: 'zoot',
    }

    test('It should response with 201 created', async () => {
      const response = await request(app).post('/launches')
        .send(completeLaunchDate)
        .expect(201)
        .expect('Content-Type', /json/);

      const requestDate = new Date(completeLaunchDate.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      expect(requestDate).toBe(responseDate);

      expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test('It should catch missing required properties', async () => {
      const response = await request(app)
        .post('/launches')
        .send(launchDataWithoutDate)
        .expect(400)
        .expect('Content-Type', /json/);

      expect(response.body).toStrictEqual({
        error: 'Bad Request',
        message: 'Mission, rocket, launchDate, target are required'
      });
    });
    test('It should catch invalid dates', async () => {
      const response = await request(app)
        .post('/launches')
        .send(launchDataWithInvalidDate)
        .expect(400)
        .expect('Content-Type', /json/);

      expect(response.body).toStrictEqual({
        error: 'Bad Request',
        message: 'Invalid date'
      });
    });
  });
})
