const pool = require('../utils/pool');

class Fruit {
    id;
    name;
    color;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.color = row.color;
    }

    static async insert({ name, color }) {
      const { rows } = await pool.query(
        `INSERT INTO fruits (name, color)
            VALUES ($1, $2)
            RETURNING *`,
        [name, color]
      );
      return new Fruit(rows[0]);
    }

    static async findById(id){
      const { rows } = await pool.query(
        `SELECT * FROM fruits
            WHERE id = $1`,
        [id]
      );
      return new Fruit(rows[0]);
    }

    static async findAllItems(){
      const { rows } = await pool.query(
        'SELECT * FROM fruits'
      );
      return rows.map(fruit => new Fruit(fruit));
    }
}

module.exports = Fruit;
