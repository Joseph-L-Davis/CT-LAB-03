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
}

module.exports = Fruit;
