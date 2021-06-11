require('dotenv').config();
const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Car = require('../lib/models/Car');
// const Car = require('../lib/models/Car');

describe('car routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POST to create a car', async () => {
    const res = await request(app)
      .post('/api/v1/cars')
      .send({ make: 'Toyota', model: 'Prius', year: 2011 });
    
    expect(res.body).toEqual({
      id: '1',
      make: 'Toyota',
      model: 'Prius',
      year: '2011'
    });
  });

  it('GET car by ID', async () => {
    const car = await Car.insert({
      make: 'Ford',
      model: 'Focus',
      year: 1994
    });

    const res = await request(app)
      .get(`/api/v1/cars/${car.id}`);
    console.log(car);
    expect(res.body).toEqual(car);
  });
});
