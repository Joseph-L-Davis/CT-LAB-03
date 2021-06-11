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

  it.skip('POST to create a car', async () => {
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

  it.skip('GET car by ID', async () => {
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

  it.skip('GET ALL cars', async () => {
    const prius = await Car.insert({
      make: 'Toyota',
      model: 'Prius',
      year: 2011
    });
    
    const malibu = await Car.insert({
      make: 'Chevy',
      model: 'Malibu',
      year: 2019
    });

    const res = await request(app)
      .get('/api/v1/cars');
    expect(res.body).toEqual([prius, malibu]);
  });

  it('UPDATE car in DB', async () => {
    
    const res = await request(app)
      .post('/api/v1/cars')
      .send({ make: 'Toyota', model: 'Prius', year: 2011 });
    
    const prius = await Car.updateItem(res.body.id, { make: 'toyota', model: 'prius', year: 2000 });  

    const secondRes = await request(app)
      .get(`/api/v1/cars/${prius.id}`);
    expect(secondRes.body).toEqual(prius);
  });
});
