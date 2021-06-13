require('dotenv').config();
const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Car = require('../lib/models/Car');
const Headband = require('../lib/models/Headband');
const Spirit = require('../lib/models/Spirit');
const Entree = require('../lib/models/Entree');

describe.skip('car routes', () => {
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

  it('GET ALL cars', async () => {
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

  it('UPDATE car by ID', async () => {
    
    const res = await request(app)
      .post('/api/v1/cars')
      .send({ make: 'Toyota', model: 'Prius', year: 2011 });
    
    const prius = await Car.updateItem(res.body.id, { make: 'toyota', model: 'prius', year: 2000 });  

    const secondRes = await request(app)
      .get(`/api/v1/cars/${prius.id}`);
    expect(secondRes.body).toEqual(prius);
  });

  it('DELETE car by ID', async () => {
    const prius = await request(app)
      .post('/api/v1/cars')
      .send({ make: 'Toyota', model: 'Prius', year: 2011 });

    const res = await Car.deleteItem(prius.body.id);
    request(app)
      .delete(`/api/v1/cars/${prius.id}`);
    expect(res.body).toEqual(prius.id);
  });
});

describe.skip('headband routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  it('POST headband', async () => {
    const res = await request(app)
      .post('/api/v1/headbands')
      .send({ color: 'red', size: 'large' });
    console.log(res.body);
    expect(res.body).toEqual({
      id: '1',
      color: 'red',
      size: 'large'
    });
  });

  it('GET headband by ID', async () => {
    const firstBand = await Headband.insert({
      color: 'blue',
      size: 'teeny weeny'
    });

    const res = await request(app)
      .get(`/api/v1/headbands/${firstBand.id}`);

    expect(res.body).toEqual(firstBand);
  });

  it('GET all headbands', async () => {
    const yellow = await Headband.insert({
      color: 'yellow',
      size: 'super large'
    });

    const pink = await Headband.insert({
      color: 'pink',
      size: 'way medium'
    });

    const res = await request(app)
      .get('/api/v1/headbands');
    
    expect(res.body).toEqual([yellow, pink]);
  });

  it('PUT headband', async () => {
    const headband = await request(app)
      .post('/api/v1/headbands')
      .send({
        color: 'cyan',
        size: 'large'
      });

    const updatedHeadband = await Headband.updateItem(headband.body.id, {
      color: 'cyan',
      size: 'LARGER'
    });

    const res = await request(app)
      .get(`/api/v1/headbands/${updatedHeadband.id}`);

    expect(res.body).toEqual(updatedHeadband);
  });

  it('DELETE headband by ID', async () => {
    const headband = await request(app)
      .post('/api/v1/headbands')
      .send({
        color: 'cyan',
        size: 'large'
      });
    
    const res = await Headband.deleteItem(headband.body.id);
    request(app)
      .delete(`/api/v1/headbands/${headband.id}`);
    expect(res.body).toEqual(headband.id);

  });

});

describe.skip('spirit routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POST to create a spirit', async () => {
    const res = await request(app)
      .post('/api/v1/spirits')
      .send({
        name: 'Mezcal Vago',
        region: 'Oaxaca',
        abv: 47.7
      });

    expect(res.body).toEqual({
      id: '1',
      name: 'Mezcal Vago',
      region: 'Oaxaca',
      abv: '47.7'
    });
  });

  it('GET spirit  by ID', async () => {
    const conejos = await Spirit.insert({
      name: '400 Conejos',
      region: 'Mexico',
      abv: 40
    });

    const res = await request(app)
      .get(`/api/v1/spirits/${conejos.id}`);

    expect(res.body).toEqual(conejos);
  });

  it('GET all spirits', async () => {
    const beefeater = await Spirit.insert({
      name: 'Beefeater',
      region: 'London',
      abv: 43
    });

    const losJavis = await Spirit.insert({
      name: 'Los Javis',
      region: 'Oaxaca',
      abv: 42
    });

    const res = await request(app)
      .get('/api/v1/spirits');

    expect(res.body).toEqual([beefeater, losJavis]);
  });

  it('PUT spirit', async () => {
    const conejos = await request(app)
      .post('/api/v1/spirits')
      .send({
        name: '400 Conejos',
        region: 'Mexico',
        abv: 42
      });

    const updatedConejos = await Spirit.updateItem(conejos.body.id, {
      name: '400 Conejos',
      region: 'Oaxaca',
      abv:43
    });

    const res = await request(app)
      .get(`/api/v1/spirits/${updatedConejos.id}`);

    expect(res.body).toEqual(updatedConejos);

  });

  it('DELETE spirit', async () => {
    const conejos = await request(app)
      .post('/api/v1/spirits')
      .send({
        name: '400 Conejos',
        region: 'Mexico',
        abv: 42
      });

    const res = await Spirit.deleteItem(conejos.body.id);
    request(app)
      .delete(`/api/v1/spirits/${conejos.id}`);
    
    expect(res.body).toEqual(conejos.id);
  });
});

describe('entree routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POST to create an entree', async () => {
    const res = await request(app)
      .post('/api/v1/entrees')
      .send({
        name: 'Chicken Parm',
        price: 16.99,
        isGood: true
      });

    expect(res.body).toEqual({
      id: '1',
      name: 'Chicken Parm',
      price: 16.99,
      isGood: true
    });
  });

  it('GET entree by id', async () => {
    const dinner = await Entree.insert({
      name: 'Meatballs',
      price: 9.99,
      isGood: false
    });

    const res = await request(app)
      .get(`/api/v1/entrees/${dinner.id}`);

    expect(res.body).toEqual(dinner);
  });
  
  it('GET all entrees', async () => {
    const pizza = await Entree.insert({
      name: 'Big Pie',
      price: 15.00,
      isGood: true
    });

    const chowder = await Entree.insert({
      name: 'Clam Chowder',
      price: 11.99,
      isGood: false
    });

    const res = await request(app)
      .get('/api/v1/entrees');

    expect(res.body).toEqual([pizza, chowder]);
  });

  it('PUT entree', async () => {
    const tots = await request(app)
      .post('/api/v1/entrees')
      .send({
        name: 'Delicious Tots',
        price: 8.95,
        isGood: true
      });

    const updatedTots = await Entree.updateItem(tots.body.id, {
      name: 'Delicious Tots',
      price: 14.99,
      isGood: false
    });

    const res = await request(app)
      .get(`/api/v1/entrees/${updatedTots.id}`);
    
    expect(res.body).toEqual(updatedTots);
  });

  it('DELETE entree by ID', async () => {
    const tots = await request(app)
      .post('/api/v1/entrees')
      .send({
        name: 'Delicious Tots',
        price: 8.95,
        isGood: true
      });

    const res = await Entree.deleteItem(tots.body.id);
    request(app)
      .delete(`/api/v1/entrees/${tots.id}`);

    expect(res.body).toEqual(tots.id);
  });


});
