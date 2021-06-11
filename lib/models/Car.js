const cars = require('../controllers/cars');
const pool = require('../utils/pool');

class Car {
    id;
    make;
    model;
    year;

    constructor(row) {
      this.id = row.id;
      this.make = row.make;
      this.model = row.model;
      this.year = row.year;
    }

    static async insert({ make, model, year }) {
      const { rows } = await pool.query(
        'INSERT INTO cars (make, model, year) VALUES ($1, $2, $3) RETURNING *',
        [make, model, year]
      );

      return new Car(rows[0]);
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM cars WHERE id = $1', [id]
      );
      return new Car(rows[0]);
    }

    static async findAllItems() {
      const { rows } = await pool.query(
        'SELECT * FROM cars');

      return rows.map(car => new Car(car));
    }

    static async updateItem(id, { make, model, year }){
      const { rows } = await pool.query(
        `UPDATE cars 
        SET make = $1, model = $2, year = $3
        WHERE id = $4 
        RETURNING *`,
        [make, model, year, id]
      );
      return new Car(rows[0]);
    }
}

module.exports = Car;
